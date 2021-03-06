import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import freetool from 'freetool';
import controller from '@store/connect/controller';

import { connect } from 'react-redux';
import actions from '@actions/index';
const { getDisplayName } = freetool;

interface Props {
  Actions: any;
  State: any;
}

let action: any = {};
Object.keys(controller).forEach(item => {
  action[item] = item;
  action[item + '_action'] = controller[item];
});

const handleActionState = (trigger: string[]) => {
  let action = {};
  let stateKey = [];
  trigger.forEach(actionType => {
    if (controller.hasOwnProperty(actionType)) {
      const actionTp = controller[actionType];
      action[actionTp] = actions[actionTp];
      Array.prototype.push.call(stateKey, `state_${actionType}`);
    }
  });
  return { controller, action, stateKey };
};

const connectAid = (trigger: string[]) => WrapperComponent => {
  const { controller, action, stateKey } = handleActionState(trigger);
  const wrapperName = getDisplayName(WrapperComponent);
  class ProxyComponent extends Component<Props, any> {
    static displayName = `connectAid(${wrapperName})`;
    constructor(props) {
      super(props);
    }
    render() {
      return <WrapperComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    const State: any = {};
    stateKey.forEach((items: any) => {
      State[items] = state[`state_${controller[items.substring(6)]}`];
    });
    return { State };
  };

  const mapDispatchToProps = dispatch => ({
    Actions: bindActionCreators(action, dispatch),
  });

  const ResponseCompnent = connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProxyComponent);
  return ResponseCompnent as any;
};

export const Actions: any = action;
export default connectAid;
