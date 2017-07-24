const functions = require('firebase-functions');

const MAX_LOG_COUNT = 5;

exports.truncate = functions.database.ref('/users/{useruid}/artists').onWrite(event => {
  const parentRef = event.data.ref;
  return parentRef.once('value').then(snapshot => {
    if (snapshot.numChildren() >= MAX_LOG_COUNT) {
      let childCount = 0;
      const updates = {};
      snapshot.forEach(function(child) {
          console.log(child);
        if (++childCount <= snapshot.numChildren() - MAX_LOG_COUNT) {
          updates[child.key] = null;
        }
      });
      return parentRef.update(updates);
    }
  });
});