import moment from 'moment';

export default (posts, {
  text,
  sortBy,
  startDate,
  endDate
}) => {
  return posts.filter((post) => {
    const creationDate = moment(post.createdAt);
    const textMatch = post.title.toLowerCase().includes(text.toLowerCase());
    const startDateMatch = startDate ? startDate.isSameOrBefore(creationDate) : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(creationDate) : true;

    return textMatch && startDateMatch && endDateMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return (a.createdAt < b.createdAt) ? 1 : -1;
    } else if (sortBy === 'title') {
      if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
      if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
      return 0;
    }
  });
};
