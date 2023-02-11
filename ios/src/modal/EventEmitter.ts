class EventEmitter {
    TYPES = {
      REFRESH_DASHBOARD: "refresh_Dashboard",
      REFRESH_INSIGHT: "refresh_Insights",
      REFRESH_ANALYSIS: "refresh_Analytics",
      REFRESH_COMMUNITY: "refresh_Community",
      DISMISS_MODAL: "DISMISS_MODAL",
    };
  
    events = {};
    constructor() {
      this.events = {};
    }
  
    addListener = (eventName, handler) => {
      // @ts-ignore
      const { [eventName]: queue } = this.events;
      const arr = queue || [];
      arr.push(handler);
      this.events[eventName] = arr;
  
      return this.removeListener.bind(this, eventName, handler);
    };
  
    removeListener = (eventName, handler) => {
      // @ts-ignore
      const { [eventName]: queue } = this.events;
      const arr = queue || [];
      arr.splice(arr.indexOf(handler), 1);
    };
  
    emit = (eventName, payload?) => {
      // @ts-ignore
      const { [eventName]: queue } = this.events;
  
      (queue || []).map((i) => {
        try {
          i && i(payload, eventName);
        } catch (error) {
          console.warn("EventEmitter", error);
        }
      });
    };
  }
  
  export default new EventEmitter();
  