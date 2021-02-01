import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
// common components
import WhiteHeader from "../../components/WhiteHeader/WhiteHeader";
import ReactMd from 'react-md-file';
import axios from 'axios';
let url = `https://raw.githubusercontent.com/StreamSpace/desktop-docs/master/${process.env.REACT_APP_ELECTRON_VERSION}.md`;

//Update modal
class UpdateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMd: false,
    };
  }

  componentDidMount(){
    axios.get(url).then((res) => {
      this.setState({
        showMd: true
      })
    }).catch((err)=>{
      url = "https://raw.githubusercontent.com/StreamSpace/desktop-docs/master/README.md"
      axios.get(url).then(res=>{
        this.setState({
          showMd: true
        })
      },err=>{ console.log(err)})
    })
  }

  componentDidUpdate(prevProps){
    if(prevProps !== this.props){
      if(this.props.show !== prevProps.show){
        this.setState({
          showMd: false
        })
      }
    }
  }

  render() {
    return (
      <Fragment>
        <Modal show={this.props.show} onHide={this.props.onHide} size="md" centered keyboard={false}>
        <Modal.Header className="p-0 position-relative">
            <WhiteHeader label={"What's New"} className="w-100 text-center"></WhiteHeader>
            <div className="ss-modal-close-btn" onClick={() => this.props.onHide()}><span className="icon-cancel"></span></div>
          </Modal.Header>
          <Modal.Body style={{'maxHeight': 'calc(100vh - 150px)', 'overflowY': 'auto', 'padding': '2rem'}}>
            {this.state.showMd && <ReactMd fileName={url} />}
          </Modal.Body>
        </Modal>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(UpdateModal);
