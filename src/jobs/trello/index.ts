import Trello from '../../services/trello';

export async function setTodaysJobs() {
  const lists = await Trello.getLists();
  const tomorrowList = lists.find(list => list.name === 'Tomorrow');
  const todayList = lists.find(list => list.name === 'Today');

  if (!tomorrowList || !todayList) {
    return;
  }

  const tomorrowCards = await Trello.getCards(tomorrowList.id);
  for (const card of tomorrowCards) {
    Trello.moveCard(card.id, todayList.id);
  }

  console.log(lists);
}
