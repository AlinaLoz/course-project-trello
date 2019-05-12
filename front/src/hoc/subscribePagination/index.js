import React from 'react';
import {Button} from "semantic-ui-react";
import GLOBAL from "../../constans/global";

function subscribePagination(WrappedComponent) {
  return class extends React.Component {
    state = {
      numberPage: 0,
    };

    renderPaginationPanel = () => {
      return (
        <div className={'render-pagination-panel'}>
          {this.state.numberPage > 0 &&
          <Button className="render-pagination-panel-left" onClick={() => this.changePage(-1)}>Назад</Button>}
          {this.state.numberPage < parseInt(this.props.countRecord / GLOBAL.LIMIT_RECORD_ON_PAGE) - 1 &&
            <Button className="render-pagination-panel-right" onClick={() => this.changePage(1)}>Вперёд</Button>}
        </div>
      )
    };

    changePage = (changeValue) => {
      const {setValue, typeComponent} = this.props;
      let {numberPage} = this.state;
      numberPage += parseInt(changeValue);
      this.setState({numberPage});
      setValue(typeComponent, 'numberPage', numberPage);
    };

    render() {
      return (
        <React.Fragment>
          <WrappedComponent currComponent {...this.state} {...this.props}/>
          {this.renderPaginationPanel()}
        </React.Fragment>
      )
    }
  }
}

export default subscribePagination;