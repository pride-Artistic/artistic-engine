type EventOrEventGroup = string | EventGroup;

export default class EventGroup {
  protected events: EventOrEventGroup[];

  protected listener: (e: Event) => unknown;

  constructor(events: EventOrEventGroup[], listener: (e: Event) => unknown) {
    this.events = [...events];
    this.listener = listener;
  }

  get Events() {
    return this.events.slice();
  }

  public addEvent(events: EventOrEventGroup | EventOrEventGroup[]) {
    if (Array.isArray(events)) {
      events.map((ev) => this.addEvent(ev));
    } else {
      this.events.push(events);
    }
  }

  public removeEvent(events: EventOrEventGroup | EventOrEventGroup[]) {
    if (Array.isArray(events)) {
      events.map((ev) => this.removeEvent(ev));
    } else {
      const index = this.events.indexOf(events);
      if (index > -1) this.events.splice(index, 1);
    }
  }

  public registerEvent() {
    this._registerEvent(this.listener);
  }

  public unregisterEvent() {
    this._unregisterEvent(this.listener);
  }

  protected _registerEvent(func: (e: Event) => unknown) {
    this.events.map((ev) => {
      if (typeof ev === "string") {
        addEventListener(ev, func);
      } else {
        ev._registerEvent(func);
      }
    });
  }

  protected _unregisterEvent(func: (e: Event) => unknown) {
    this.events.map((ev) => {
      if (typeof ev === "string") {
        removeEventListener(ev, func);
      } else {
        ev._unregisterEvent(func);
      }
    });
  }
}
