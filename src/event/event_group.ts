type EventName = string;
type EventDest = { event: EventName; target?: EventTarget };

export default class EventGroup {
  protected defaultTarget: EventTarget;

  protected events: Map<EventName, Set<EventTarget>>;

  protected listener: (e: Event) => unknown;

  constructor(events: EventDest[], defaultTarget: EventTarget = window) {
    this.events = new Map();
    this.defaultTarget = defaultTarget;
    if (Array.isArray(events)) {
      this.updateEvent(...events);
    } else {
      this.updateEvent(events);
    }
  }

  public updateEvent(...eventDests: EventDest[]) {
    for (const eventDest of eventDests) {
      let eventTargets = this.events.get(eventDest.event);
      const eventTarget = eventDest.target ?? this.defaultTarget;
      if (eventTargets == null) {
        eventTargets = new Set();
        this.events.set(eventDest.event, eventTargets);
      }
      eventTargets.add(eventTarget);
    }
  }

  public setListener(listener: (e: Event) => unknown) {
    this.unregisterEvent();
    this.listener = listener;
  }

  public registerEvent() {
    this.events.forEach((v, k) => {
      v.forEach((element) => element.addEventListener(k, this.listener));
    });
  }

  public unregisterEvent() {
    this.events.forEach((v, k) => {
      v.forEach((element) => element.removeEventListener(k, this.listener));
    });
  }
}
