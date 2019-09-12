import Dispatcher from './dispatcher';
import Constants from './constants';

class Actions {
  navigatedTo(target) {
    Dispatcher.dispatch({
      actionType: Constants.NAVIGATED_TO,
      target: target
    })
  }   
}
export default new Actions();