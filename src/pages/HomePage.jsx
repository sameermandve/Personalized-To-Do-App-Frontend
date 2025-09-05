
import { useEffect } from "react";
import { AddList } from "../components/AddList";
import { useListStore } from "../store/useListStore";
import { Link } from "react-router-dom";

function HomePage() {

    const { lists, getLists } = useListStore();

    useEffect(() => {
        getLists();
    }, [getLists]);

    return (
        <div className='h-screen'>
            <div className="container mx-auto w-full pt-25 pb-6 sm:pb-12 px-8">
                <div className="space-y-6">

                    {/* Home page head */}
                    <div className="space-y-4 flex flex-col lg:items-center lg:justify-center">
                        <h1 className="text-2xl text-primary/90 font-semibold tracking-wide">Your Lists</h1>
                        <p className="text-base-content/90 tracking-wide">Here are all the to-do lists you've' created. Click on a list to view it's tasks.</p>
                    </div>
                    {/* Home page head end */}

                    <AddList />

                    {/* Lists Field */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2 gap-4">
                        {lists && lists.length > 0 ?
                            (
                                lists.map((list) => (
                                    <button
                                        key={list._id}
                                        className="flex flex-col border-2 border-base-content/50 bg-accent/10 rounded-xl"
                                    >
                                        <div className="p-8 space-y-5 flex flex-col flex-1">
                                            <div className="space-y-2 flex-1">
                                                <h1 className="text-xl text-left text-base-content/90 font-semibold">{list.listName}</h1>
                                                <p className="text-base-content/80 text-left">{list.listDesc}</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p>{list.todos.length} {list.todos.length >= 2 ? "tasks" : "task"}</p>
                                                <Link
                                                    to={`/list/${list._id}`}
                                                    className={`btn focus:btn-outline-none btn-primary btn-sm transition-colors`}
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <p className="w-full mt-6 text-center sm:col-span-2 lg:col-start-2 lg:col-end-3 text-base-content/90 text-lg">No lists found! Create one above</p>
                            )}
                    </div>
                    {/* Lists Field end */}
                </div>
            </div>
        </div>
    );
}

export default HomePage