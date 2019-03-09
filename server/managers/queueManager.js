class PlayerQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(name) {
    console.log('adding a person to the queue');
    this.queue.push(name);
    console.log('after adding: ', this.queue);
    return this.queue;
  }

  dequeue() {
    return this.queue.shift();
  }

  getQueue() {
    return this.queue;
  }
}

module.exports = new PlayerQueue();
