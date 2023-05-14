type EventName = string;
interface EventListenable {
  addEventListener: (
    eventEmitter: EventName,
    listener: (e: Event) => unknown
  ) => void;
  removeEventListener: (
    eventEmitter: EventName,
    listener: (e: Event) => unknown
  ) => void;
}
type EventMap = Map<EventName, Set<EventListenable>>;

export default class EventGroup {
  protected events: EventMap;

  protected listener: (e: Event) => unknown;

  constructor(events: EventMap | EventMap[], listener: (e: Event) => unknown) {
    this.events = new Map();
    if (Array.isArray(events)) {
      this.updateEvent(...events);
    } else {
      this.updateEvent(events);
    }
    this.listener = listener;
  }

  public updateEvent(...events: EventMap[]) {
    events.forEach((evmap) => {
      evmap.forEach((v, k) => {
        const elements = this.events.get(k);
        if (elements instanceof Set) {
          v.forEach((element) => elements.add(element));
        } else {
          this.events.set(k, new Set(v));
        }
      });
    });
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
