import React, { useEffect, useState } from 'react'
import CommentReply from './CommentReply';
import axios from "axios";
import useAxios from '../../../utils/useAxios';
import jwtDecode from "jwt-decode";
import moment from 'jalali-moment';

export default function CommentArticle(props) {

    const baseurl = "http://127.0.0.1:8000/api/posts/v1";
    const [showReplyForm, setshowReplyForm] = useState(false)
    // const [comments, setComments] = useState([]);
    const [commentText, setcommentText] = useState("")
    // {
    //     "id": 1,
    //     "username": "Abbasali",
    //     "children_comments": [],
    //     "blog_body": "hi",
    //     "user": 2,
    //     "blog_item": 5,
    //     "parent": null
    // }

    const [commentChild, setCommentChild] = useState(props.comment.children_comments)


    const api = useAxios();
    const token = localStorage.getItem("authTokens")

    if (token) {
        const decode = jwtDecode(token)
        var user_id = decode.user_id
        var username = decode.username
        var full_name = decode.full_name
        var image = decode.image

    }



    const handleSubmit = (event) => {
        event.preventDefault();
        const form = {
            "blog_item": props.blog_id,
            'blog_body': commentText,
            'parent': props.comment.id,
            "user_id": user_id,
        }
        // console.log(form);

        axios({
            method: 'post',
            url: baseurl + '/comment/create/',
            data: form,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(
            function (response) {
                setCommentChild(
                    [...commentChild, response.data]
                )
            }
        );
        setcommentText("")
        // window.location.reload();

        // Reset form fields
    };
    
    const createdDate = new Date(props.comment.created_at);
    const createdDateFormatted = createdDate.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    });
    const createdDatePersian = moment(props.comment.created_at).locale('fa').format('YYYY/MM/DD HH:mm:ss');
    return (
        <>

            <article class="p-6 text-base bg-white rounded-lg dark:bg-gray-900 mb-1">
                <footer class="flex justify-between items-center mb-2">

                    <div class="flex items-center">
                        <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                            class="mr-2 w-6 h-6 rounded-full"
                            src={props.comment.profile.image}
                            alt="Michael Gough" />{props.comment.username}</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            <time pubdate dateTime="2022-02-08"
                                title="February 8th, 2022">{createdDatePersian}</time></p>
                    </div>

                    <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                        class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                        </svg>
                        <span class="sr-only">Comment settings</span>
                    </button>

                    {/* <!-- Dropdown menu --> */}
                    <div id="dropdownComment1"
                        class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownMenuIconHorizontalButton">
                            <li>
                                <a href="#"
                                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                            </li>
                            <li>
                                <a href="#"
                                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                            </li>
                            <li>
                                <a href="#"
                                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                            </li>
                        </ul>
                    </div>
                </footer>

                <p class="text-gray-500 dark:text-gray-400">

                    {props.comment.blog_body}

                </p>

                {
                    showReplyForm &&
                    // <section class="bg-gray-200 dark:bg-gray-900 py-8 lg:py-16 antialiased">
                    <div class="max-w-2xl mx-auto px-4">

                        {/* onSubmit={handleSubmit} */}
                        <form class="mb-6" onSubmit={handleSubmit}>
                            <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                <label for="comment" class="sr-only">Your comment</label>
                                <textarea id="comment" rows="6"
                                    class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                    placeholder="Write your Reply..." required
                                    onChange={(e) => setcommentText(e.target.value)}
                                    value={commentText}
                                ></textarea>
                            </div>
                            <button type="submit"
                                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-400 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-500">
                                Reply
                            </button>
                        </form>


                    </div>
                    // </section> */}
                }
                <div class="flex items-center mt-4 space-x-4">
                    <button type="button"
                        onClick={() => setshowReplyForm(!showReplyForm)}
                        class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                        <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                        </svg>
                        Reply
                    </button>

                    <button type="button"
                        class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">

                        <svg xmlns="http:4/ww4 mr-1.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                        </svg>

                        Like

                    </button>
                    <button type="button"
                        class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                        </svg>


                        UnLike

                    </button>


                </div>
            </article>
            {
                commentChild.length != 0 &&
                commentChild.map((item, index) => {
                    return <CommentReply comment={item} key={index}
                    // commentChild={commentChild}
                    // setCommentChild={setCommentChild}
                    />
                })

            }
        </>
    )
}
