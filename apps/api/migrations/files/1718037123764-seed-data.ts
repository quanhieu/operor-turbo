import { getDb } from '../utils/db';
import { readFileJSONAndParse } from '../utils';
const { ObjectId } = require('mongodb');

export const up = async () => {
  const db = await getDb();

  const users = await readFileJSONAndParse('users');
  await db.collection('users').insertMany(users);

  const mappingUserIds = users.reduce((acc: any, item: any) => {
    acc[item.id] = item._id.toHexString();
    return acc;
  }, {});

  const meetings = await readFileJSONAndParse('meetings');
  const formatMeetings = meetings.map((item: any) => {
    return {
      ...item,
      user_id: new ObjectId(mappingUserIds[item.user_id]),
    };
  });
  await db.collection('meetings').insertMany(formatMeetings);

  console.log('==== Seed Data Successfully ====');
};

export const down = async () => {
  const db = await getDb();
  await db.collection('users').drop();
  await db.collection('meetings').drop();
};
