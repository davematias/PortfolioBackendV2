import Dispatcher from './dispatcher';
import Constants from './constants';
import EventEmitter from 'events';

const CHANGE_EVENT = 'CHANGE';
let _navigatedTarget = '';

class NavigationStore extends EventEmitter {
  constructor() {
    super();
    Dispatcher.register(this.registerActions.bind(this));
  }
  
  registerActions(action) {
    switch(action.actionType) {
      case Constants.NAVIGATED_TO:        
        this.setTarget(action.target);  
        this.emit(CHANGE_EVENT);        
        break;      
    }
    return true;
  }
  
  setTarget(target) {
    _navigatedTarget = target;
  } 

  getTarget() {
    return _navigatedTarget;
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}
export default new NavigationStore();