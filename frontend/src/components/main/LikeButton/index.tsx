import { LikeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { likePost } from '~/services/api';
import { IPost } from '~/types/types';

interface IProps {
    postID: string;
    isLiked: boolean;
    likeCallback: (post: IPost) => void;
}

const LikeButton: React.FC<IProps> = (props) => {
    const [isLiked, setIsLiked] = useState(props.isLiked);

    useEffect(() => {
        setIsLiked(props.isLiked);
    }, [props.isLiked]);

    const dispatchLike = async () => {
        try {
            const { post, state } = await likePost(props.postID);
            setIsLiked(state);
            props.likeCallback(post);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <span
            className={` px-1 py-2 rounded-md flex items-center justify-center ${isLiked ? 'text-indigo-700 font-bold' : 'text-gray-700 hover:text-gray-800'} cursor-pointer hover:bg-gray-100 text-l w-2/4`}
            onClick={dispatchLike}
        >

            <LikeOutlined />
            &nbsp;
            {isLiked ? 'Unlike' : 'Like'}
        </span>
    );
};

export default LikeButton;
