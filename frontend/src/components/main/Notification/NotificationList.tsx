import { CommentOutlined, LikeOutlined, UserAddOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import Avatar from '~/components/shared/Avatar';
import { displayTime } from '~/helpers/utils';
import { INotification } from "~/types/types";

interface IProps {
    notifications: INotification[],
    toggleNotification: (bool: boolean) => void;
    readNotification: (id: string) => void;
}

const NotificationList: React.FC<IProps> = ({ toggleNotification, notifications, readNotification }) => {
    const history = useHistory();
    const handleNotificationClick = (link: string, id: string) => {
        readNotification(id);
        toggleNotification(false);
        history.push(link);
    };

    return (
        <div>
            {notifications.length === 0 ? (
                <div className="text-center p-4">
                    <p className="text-gray-400 italic">No new notifications</p>
                </div>
            ) : (
                    <div className="max-h-80vh overflow-y-scroll divide-y divide-gray-100">
                        {notifications.map((notif) => (
                            <div
                                className={`${notif.unread ? 'bg-indigo-100 hover:bg-indigo-200' : 'bg-white'} p-4 hover:bg-gray-100 hover:opacity-95 divide-y divide-y-2 divide-gray-100`}
                                key={notif.id}
                                onClick={() => handleNotificationClick(notif.link, notif.id)}
                            >
                                <div className="relative">
                                    <div className="flex flex-wrap items-center">
                                        <Avatar
                                            url={notif.initiator.profilePicture}
                                            className="mr-2"
                                        />
                                        <span className="text-indigo-700">{notif.initiator.username}</span>
                                        &nbsp;
                                        <span className="text-gray-700">
                                            {
                                                notif.type === 'like' ? 'likes your post.'
                                                    : notif.type === 'comment' ? 'commented on your post.'
                                                        : notif.type === 'follow' ? 'started following you.'
                                                            : ''
                                            }
                                        </span>
                                    </div>
                                    <span className="text-gray-500 text-1xs ml-12 transform -translate-y-1 block">{displayTime(notif.createdAt)}</span>
                                    {notif.type === 'like' ? (
                                        <LikeOutlined className="text-2xl text-indigo-700 flex items-center justify-center absolute right-4 top-0 bottom-0 my-auto" />
                                    ) : notif.type === 'comment' ? (
                                        <CommentOutlined className="text-2xl text-indigo-700 flex items-center justify-center absolute right-4 top-0 bottom-0 my-auto" />
                                    ) : (
                                                <UserAddOutlined className="text-2xl text-indigo-700 flex items-center justify-center absolute right-4 top-0 bottom-0 my-auto" />
                                            )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
};

export default NotificationList;
