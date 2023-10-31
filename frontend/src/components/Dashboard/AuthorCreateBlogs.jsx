import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import useAxios from '../../utils/useAxios';
import jwtDecode from 'jwt-decode'
function AuthorCreateBlogs() {
    const baseurl = "http://127.0.0.1:8000/api/posts/v1";
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    
    const token = localStorage.getItem("authTokens")
    const api = useAxios();

    if (token) {
        const decode = jwtDecode(token)
        var is_author = decode.is_author

    }


    const [blogData, setBlogData] = useState({
        "title": "",
        "slug": "",
        "body": "",
        "tags": "",
        "categories": [],
        "img": "",
    })

    const handelInputChange = (event) => {
        const { name, value } = event.target;
        setBlogData((blogData) => ({
            ...blogData,
            [name]: value
        }));
    };
    const handleFileChange = (event) => {
        setBlogData((blogData) => ({
            ...blogData,
            ['img']: event.target.files[0] // Match the key used in FormData
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = {
            'title': blogData.title,
            'slug': blogData.slug,
            'body': blogData.body,
            'tags': blogData.tags,
            'img': blogData.img,
            'categories': blogData.categories,
            'status': document.getElementById('status2').checked

        }
        console.log(form);
        api.post(baseurl + '/author/posts/', form, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(response => {
                console.log('Post created:', response.data);
            })
            .catch(error => {
                console.error('Error creating post:', error);
            });

        setBlogData({

            "title": "",
            "slug": "",
            "body": "",
            "tags": "",
            "categories": "",
            "img": "",
        })
    };

    useEffect(() => {
        api.get(baseurl + '/categories/') // Adjust the URL to your actual category endpoint
            .then(response => {
                setCategoriesData(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    if(!is_author){
        window.location.href="/dashboard"
    }


    return (
        <div className='grid grid-cols-3 bg-gray-300'>
            <div className='col-span-1'>
                <Dashboard />
            </div>
            <div className='col-span-2 mr-24 mt-16'>
                <div className="lg:ms-auto mx-auto text-center">
                    <div className="py-16 px-7 rounded-md bg-white">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                                <input
                                    type="text"
                                    id="fname"
                                    name="title"
                                    placeholder="Title"
                                    value={blogData.title}
                                    onChange={handelInputChange}
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                                />
                                <input
                                    type="text"
                                    id="fname"
                                    name="slug"
                                    placeholder="Slug"
                                    value={blogData.slug}
                                    onChange={handelInputChange}
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                                />

                                <div className="md:col-span-2">
                                    <label htmlFor="categories" className="float-left block font-normal text-gray-400 text-lg">
                                        Categories:
                                    </label>
                                    <select
                                        id="subject"
                                        name="categories"
                                        
                                        onChange={handelInputChange}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                                    >
                                        <option value="" disabled selected>
                                            Choose category:
                                        </option>
                                        {categoriesData?.map((category) => {
                                            return (

                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>

                                            )
                                        })}
                                    </select>
                                </div>


                                <div className="md:col-span-2">
                                    <label htmlFor="file" className="float-left block font-normal text-gray-400 text-lg">
                                        Image:
                                    </label>
                                    <input
                                        type="file"
                                        name='img' // Match the key in FormData
                                        onChange={handleFileChange}
                                        id="ProfileImage"
                                        aria-describedby="emailHelp"
                                        className="peer block w-full appearance-none border-none bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                                    />

                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="status2" className="float-left block font-normal text-gray-400 text-lg">
                                        Status:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="status2"
                                        name="file"
                                        className='transform scale-150'
                                    />
                                </div>


                                <div className="md:col-span-2">
                                    <label htmlFor="subject" className="float-left block font-normal text-gray-400 text-lg">
                                        Body:
                                    </label>
                                    <textarea
                                        name="body"
                                        rows="5"
                                        cols=""
                                        placeholder="Body..."
                                        value={blogData.body}
                                        onChange={handelInputChange}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                                    ></textarea>
                                </div>
                                <div className="md:col-span-2">
                                    <textarea
                                        name="tags"
                                        rows="5"
                                        cols=""
                                        placeholder="Tags, please separate with ,"
                                        value={blogData.tags}
                                        onChange={handelInputChange}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                                    ></textarea>
                                </div>
                                <div className="md:col-span-2">
                                    <button className="py-3 text-base font-medium rounded text-white bg-blue-800 w-full hover:bg-blue-700 transition duration-300">
                                        Valider
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthorCreateBlogs;
