import React, { useEffect } from 'react';
import {
  MessageSentDocument,
  useGetChatsQuery,
  useMeQuery,
} from 'src/generated/graphql';
import SendMessage from './SendMessage';

export const Chat: React.FC = () => {
  const { data: userData } = useMeQuery();
  const { data, loading, error, subscribeToMore } = useGetChatsQuery();

  useEffect(() => {
    subscribeToMore({
      document: MessageSentDocument,
      updateQuery: (prev, { subscriptionData }: any) => {
        console.log(subscriptionData.data.messageSent);

        return {
          getChats: [...prev.getChats, subscriptionData.data.messageSent],
        };
      },
    });
  }, []);

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <>
      <div className='text-white fixed bottom-0 right-0 z-10 bg-dark-light p-5 rounded-lg mr-10 mb-10'>
        {data?.getChats.map((chat: any) => (
          <div key={chat.id}>
            <p>
              {chat.name}: {chat.message}
            </p>
          </div>
        ))}
        {userData?.me && <SendMessage name={userData.me.username} />}
      </div>
    </>
  );
};
