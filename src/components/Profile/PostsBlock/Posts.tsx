import React, {memo} from 'react';
import PostItem from './Post/PostItem';
import AddingNewPost from './Post/AddingNewPost/AddingNewPost';
import {postItemType} from "../../../types/types";

type Props = {
    PostItem: Array<postItemType>
    currentUserId: number
    currentFullName: string
    currentProfileImage: {
        small: string
        large: string
    }
}

function Posts(props: Props) {
    const PostElem = [...props.PostItem].reverse().map(post => <PostItem post={post}
                                                       currentFullName={props.currentFullName} currentUserId={props.currentUserId} currentProfileImage={props.currentProfileImage.small}/>)
    return <div>
        <AddingNewPost currentUserId={props.currentUserId} currentFullName={props.currentFullName} currentProfileImage={props.currentProfileImage.large}/>
        {PostElem}
    </div>

}

export default memo(Posts);