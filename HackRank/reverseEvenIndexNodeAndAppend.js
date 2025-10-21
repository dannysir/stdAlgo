function extractAndAppendSponsoredNodes(head) {
  let target = head;
  const evenIndexArr = [];
  const oddIndexArr = new SinglyLinkedList();

  let evenFlag = true;
  while (target) {
    if (evenFlag) {
      evenIndexArr.push(target.data);
    } else {
      oddIndexArr.insertNode(target.data);
    }
    evenFlag = !evenFlag;
    target = target.next;
  }

  evenIndexArr.reverse().forEach(data => {
    oddIndexArr.insertNode(data);
  })

  return oddIndexArr.head;
}