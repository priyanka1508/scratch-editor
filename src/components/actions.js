const QueueAction = (type, payload) => {
    return {
        type: type,
        payload: payload
      }
}

export default QueueAction;
