import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ButtonToolbar, Overlay, Popover } from "react-bootstrap";
import { createRipples } from "react-ripples";
import "./Header.scss";
import { withRouter } from "react-router";

// actions
import { authActions, fileShareActions, debugActions, notificationActions} from "../../actions";
import UpdateModal from "./UpdateModal";
import appLogoDark from "../../assets/app-logo-dark-bg.svg"
import socketIOClient from 'socket.io-client'
import config from '../../config';
import moment from 'moment';
import Dropdown from "react-bootstrap/Dropdown";
import { ipcRenderer } from "electron";
const os = require('os');
const socketKey = config.SOCKET_TOKEN;
const { app } = require('electron').remote;


const MyRipples = createRipples({
  during: 800
});

//Header component
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || "Jhon’s Imac",
      show: false,
      target: null,
      showUpdateSoftwareModal: false,
      count : 0,
      notifications: [],
      socket: false,
      logout: false
    };
    this.ref = React.createRef();
  }

  componentDidMount(){
    this.props.getUserProfile();  
    // this.handleSocket();  
  }

  
  componentDidUpdate(prevProps){
    if(this.props !== prevProps){
      if(this.props.notifications.length !==  this.state.notifications.length){
        this.setState({
          notifications : [...this.props.notifications]
        })
      }
      if(this.props.notificationCount && (this.props.notificationCount !==  this.state.count)){
        this.setState({
          count : this.props.notificationCount
        }) 
      }
      if (this.props.deleteNotificationSuccess || this.props.deleteAllNotification) {
        if(this.props.deleteAllNotification){
          this.setState({ notifications: [] });
          this.props.getNotifications(this.props.id, this.props.nodeIndex);
          this.props.resetDeleteNotification()
        } else if(!this.props.deleteAllNotification){
          this.props.getNotifications(this.props.id, this.props.nodeIndex);
          this.props.resetDeleteNotification()
        }
      }

      if(this.props.startDaemonObserable !== null) {
        this.props.startDaemonObserable.subscribe((res) => {
          // Navigate to login page when daemon stopped properly and user clicked on Logout button 
          if(res.status === 200 && res.message.includes("Hive agent stopped")) {
            if(this.state.logout){
              console.log("navigate to login page")
              this.props.history.push("/signin");
            }
          }
        })
      }
    }
  }
  
  componentWillUnmount(){
    // this.handleCloseSocket();
  }

   // open socket
  handleSocket = () => {
    const socket = socketIOClient(config.SOCKET_URL, {
      query: "token=" + socketKey,
      transports: ["websocket"],
      upgrade: false,
    });
    socket.on("error", (err) => {
      console.log("socket auth error: ", err);
    });
    this.setState({ socket: socket });
    socket.on("subscribeToNotification", (data) => {
      if(this.props.nodeIndex === data.nodeIndex && this.props.id === data.userId ){
        const {  count } = this.state;
        const { notifications } = this.state;
        // find if this notification already exit
        const found = notifications.find((item) => item._id === data._id);
        console.log("handleSocket", data )
        if (!found) {
          notifications.push(data);
          let  tempCount = count + 1 ;
          this.setState({ notifications, count : tempCount });
          this.props.setNotificationCount(tempCount);
          this.props.updateNotificationData(notifications)
          if(os.platform() === 'darwin'){
             app.setBadgeCount(tempCount);
          }
          if(os.platform() === 'win32'){
            ipcRenderer.sendSync('update-badge', tempCount);
          }
        }
        //send important notification to OS
        if(data.isImportant && this.props.isOSNotification){
          new Notification(data.message, {
            body: moment(data.createdAt).format('lll')
          })
        }
      }
    });
  };

  // close socket
  handleCloseSocket = () => {
    const socket = this.state.socket 
    socket.off("subscribeToNotification");
    socket.disconnect();
  };

  //Account Menu click
  handleClick = event => {
    this.setState({
      show: !this.state.show,
      target: event.target
    });
  };

  //Signout button handler
  signOut = event => {
    event.preventDefault();
    this.setState({
      logout: true
    })
    this.props.logout();
    // this.props.history.push("/signin");
  };

  //settings button handler
  settings = event => {
    event.preventDefault();
    this.props.history.push("/app/settings");
  };

  //New update popup open
  update = event => {
    event.preventDefault();
    this.setState({ showUpdateSoftwareModal: true })
  };

  //delete notification 
  clearNotification = async(user_id, nodeIndex, id) =>{
    if(user_id && nodeIndex && id){
      await this.props.deleteNotification(user_id, nodeIndex, id);
    }
  }

  //bell Icon handler 
  handleToggle = (e) => {
    if (e) {
      this.setState({ count: 0 });
      this.props.setNotificationCount(0);
      localStorage.setItem('notification-count',0);
      if(os.platform() === 'darwin'){
        app.setBadgeCount(0);
        if(this.props.bounceId){
         app.dock.cancelBounce(this.props.bounceId);
        }
      }
      if(os.platform() === 'win32'){
       ipcRenderer.sendSync('update-badge', null);
      }
    } else {
      const { count } = this.state;
      if (count) {
        this.setState({ count: 0 });
      }
    }
  };

  render() {
    const { show, target, count } = this.state;
    const {  notifications } = this.state;
    // console.log("count notifications", notifications, count);

    // this gives an object with dates as keys
    const groups = notifications.reduce((groups, item) => {
      const date = moment(item.createdAt).format("MMM DD YYYY");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
      return groups;
    }, {});

    // to add it in the array format instead
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        item: groups[date],
      };
    });

    const today = moment().format("MMM DD YYYY");
    return (
      <Fragment>
        <div className="Header">
          <div className="container-fluid h-100">
            <div className="row h-100">
              <div className="col-md-6">
                <div className="ss-vertical-align h-100">
                  <img
                    src={appLogoDark}
                    alt=""
                    className="streamspace-logo"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="row align-items-center justify-content-end">
                  <div id="userNotification">
                    <Dropdown onToggle={this.handleToggle}>
                    <button
                        className="notification">
                      <Dropdown.Toggle variant="custom" id="dropDownMenuNotification">
                        <i
                          className="icon-bell"
                          aria-hidden="true"
                          style={{
                            color: "#F46932",
                            fontSize: "24px",
                            lineHeight: "26px",
                          }}
                        ></i>
                        {count === 0 ? (
                          <span></span>
                        ) : (
                          <span className="badge badge_notify">{count}</span>
                        )}
                      </Dropdown.Toggle>
                      </button>

                      <Dropdown.Menu bsPrefix={"dropdown-menu dropdown-menu-right menu_height"}>
                        <div style={{ minWidth: "300px"}}>
                          <span className={`clear-all ss-cursor-pointer ${notifications.length === 0 && "ss-text-light"}`}
                            onClick={() => {
                              if(notifications.length > 0){
                                 this.clearNotification(this.props.id, this.props.nodeIndex, "all")
                              }
                            }}
                          >
                            Clear All
                          </span>
                          <span className="notification-header ss-text-bold">
                            Notifications
                          </span>
                        </div>

                        {groupArrays.length === 0 && (
                          <Dropdown.Item
                            as={"div"}
                            bsPrefix={"dropdown-item-text icon_list no_hover"}
                          >
                            <div style={{textAlign : 'center',padding: '20px'}}>No notifications</div>
                          </Dropdown.Item>
                        )}

                        {groupArrays.map((gItem, index) => {
                          return (
                            <Fragment key={index}>
                              <Dropdown.Item
                                as={"div"}
                                bsPrefix={"dropdown-item-text icon_list no_hover"}
                              >
                                <div className="date_text">
                                  {gItem.date === today ? "Today" : gItem.date}
                                </div>
                              </Dropdown.Item>

                              {gItem.item.map((item, index2) => {
                                const createdAt = moment(item.createdAt).format("MMM DD YYYY");
                                const fromNow =
                                  createdAt === today
                                    ? moment(item.createdAt).fromNow()
                                    : moment(item.createdAt).format("kk:mm");
                                return (
                                  <Fragment key={index2}>
                                    <Dropdown.Item
                                      as={"div"}
                                      bsPrefix={"dropdown-item-text icon_list"}
                                    >
                                      <div className="msg_text">{item.message}</div>
                                      <div className="time_ago">{fromNow}
                                        <span className="icon-cancel ss-cursor-pointer notification-cancel" onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          this.clearNotification(this.props.id, this.props.nodeIndex,item._id)}}>
                                        </span>
                                      </div>
                                    </Dropdown.Item>
                                  </Fragment>
                                );
                              })}
                            </Fragment>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  
                  <ButtonToolbar ref={this.ref}>
                    <MyRipples className="ss-cursor-pointer">
                      <button
                        className="account"
                        onClick={this.handleClick}
                        onBlur={(e)=> setTimeout(() => {
                          this.handleClick(e)
                        }, 400) }
                      >
                        <i className="icon-user"></i>
                      </button>
                    </MyRipples>
                    <Overlay
                      show={show}
                      target={target}
                      placement="bottom-end"
                      container={this.ref.current}
                    >
                      <Popover id="popover-contained">
                        <Popover.Content>
                          <MyRipples
                            className="menu-item"
                            onClick={() => {this.props.showDebug()}}
                          >
                            <span style={{fontSize:'20px',opacity:0.7}} className="menu-icon icon-consloe mr-2"></span>
                            <span className="menu-text ss-text-medium">
                              Console
                            </span>
                          </MyRipples>
                          <div className="ss-border-top w-75 m-auto"></div>
                          <MyRipples
                            className="menu-item"
                            onClick={() => this.props.showDownloads()}
                          >
                            <span style={{fontSize:'20px'}} className="menu-icon icon-download-queue mr-2"></span>
                            <span className="menu-text ss-text-medium">
                              Downloads
                            </span>
                          </MyRipples>
                          <div className="ss-border-top w-75 m-auto"></div>
                          <MyRipples
                            className="menu-item"
                            onClick={this.settings}
                          >
                            <span style={{fontSize:'24px',marginLeft:'-2px'}} className="menu-icon icon-settings mr-2"></span>
                            <span
                              className="menu-text ss-text-medium"
                            >
                              Settings
                            </span>
                          </MyRipples>
                          <div className="ss-border-top w-75 m-auto"></div>
                          <MyRipples
                            className="menu-item"
                            onClick={this.update}
                          >
                            <span style={{fontSize:'20px',opacity:0.7}} className="menu-icon icon-information mr-2"></span>
                            <span
                              className="menu-text ss-text-medium"
                            >
                              What's New
                            </span>
                          </MyRipples>
                          <div className="ss-border-top w-75 m-auto"></div>
                          <MyRipples
                            className="menu-item "
                            onClick={this.signOut}
                          >
                            <span style={{fontSize:'24px',marginLeft:'-2px'}} className="menu-icon icon-signout mr-2"></span>
                            <span className="menu-text ss-text-medium">
                              Sign Out
                            </span>
                          </MyRipples>
                        </Popover.Content>
                      </Popover>
                    </Overlay>
                 
                  </ButtonToolbar>
                  {this.state.showUpdateSoftwareModal && (
                    <UpdateModal
                      show={this.state.showUpdateSoftwareModal}
                      onHide={() =>
                        this.setState({ showUpdateSoftwareModal: false })
                      }
                    />
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ...state.authState,
  ...state.settingsState,
  ...state.notificationState
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
  showDownloads: () => dispatch(fileShareActions.showDownloads()),
  showDebug: () => dispatch(debugActions.showDebug()),
  getUserProfile: () => dispatch(authActions.getUserProfile()),
  getNotifications: (userId, nodeIndex) => dispatch(notificationActions.getNotifications(userId, nodeIndex)),
  deleteNotification: (userId, nodeIndex, id) => dispatch(notificationActions.deleteNotification(userId, nodeIndex, id)),
  resetDeleteNotification : () => dispatch(notificationActions.resetDeleteNotification()),
  setNotificationCount : (count) => dispatch(notificationActions.setNotificationCount(count)),
  updateNotificationData : (arr) => dispatch(notificationActions.updateNotificationData(arr))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
