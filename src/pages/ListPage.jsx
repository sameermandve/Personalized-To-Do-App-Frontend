import { useEffect } from "react";
import { useListStore } from "../store/useListStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Edit, Eye, Loader, MoveLeft, Trash2 } from "lucide-react";
import AddTodo from "../components/AddTodo";

function ListPage() {

    const { selectedList, getListById, deleteTodo, deleteListById } = useListStore();

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getListById(id);
        }
    }, [id, getListById, selectedList]);

    const navigate = useNavigate();

    const handleListDelete = () => {
        deleteListById(id);

        navigate("/");
    };

    const allTodos = selectedList?.data?.todos || [];

    const priorityClasses = {
        HIGH: "bg-error",
        MEDIUM: "bg-warning",
        LOW: "bg-success",
    };

    if (selectedList?.data._id !== id) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }

    if (selectedList) {
        return (
            <div className="h-screen">
                <div className="container mx-auto w-full pt-23 pb-12 sm:pb-6 px-6 space-y-10">
                    <Link
                        to="/"
                        className="flex items-center gap-2 mb-3"
                    >
                        <MoveLeft className="size-5 text-base-content" />
                        <span>Back to Home</span>
                    </Link>
                    {/* List Page head */}
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col space-y-2">
                                <h1 className="text-2xl lg:text-4xl font-bold text-base-content">{selectedList?.data?.listName}</h1>
                                <p className="text-sm lg:text-base font-semibold text-base-content/80">{selectedList?.data?.listDesc}</p>
                            </div>
                        </div>
                        <div className="flex gap-3 sm:gap-4 items-center">
                            <button
                                onClick={handleListDelete}
                                className="btn btn-xs sm:btn-sm btn-error"
                            >
                                <Trash2 className="size-4" />
                                <span className="hidden sm:inline font-semibold">Delete List</span>
                            </button>
                            <button className="flex gap-2 items-center cursor-pointer">
                                <Edit className="size-4 text-base-content" />
                                <span className="hidden sm:inline text-base-content">Edit list</span>
                            </button>
                        </div>
                    </div>
                    {/* List Page head */}

                    {/* Add Todo Form */}
                    <AddTodo id={id} />
                    {/* Add Todo Form */}

                    {/* Todo Tasks field */}
                    <div className="flex flex-col gap-6">
                        {selectedList && selectedList?.data && allTodos.length > 0 ?
                            (allTodos.map((todo) => (
                                <div
                                    key={todo._id}
                                    className={`flex items-center justify-between py-4 px-3 ${todo.isComplete ? "bg-base-content/30" : "bg-base-content/10"}  rounded-2xl lg:px-8`}
                                >
                                    <div>
                                        <h1 className={`font-semibold text-base lg:text-lg ${todo.isComplete ? "line-through" : ""}`}>{todo.title}</h1>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className={`py-1 px-2 rounded-xl ${priorityClasses[todo.priority]}`}>
                                            <p className={`text-sm font-semibold ${todo.isComplete ? "line-through text-base-100/80" : "text-base-100"}`}>{todo.priority}</p>
                                        </div>
                                        <Trash2
                                            onClick={() => deleteTodo(id, todo._id)}
                                            className="size-4 sm:size-5 text-error cursor-pointer"
                                        />
                                        <Link
                                            to={`/lists/${id}/todos/${todo._id}`}
                                        >{
                                                <Eye
                                                    className="size-4 sm:size-5 text-base-content cursor-pointer"
                                                />
                                            }</Link>
                                    </div>
                                </div>
                            ))) : (
                                <div className="flex my-auto items-center justify-center h-50">
                                    <p className="text-center text-xl text-base-content/80">No todos found! Create one above</p>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <Loader className="size-10 animate-spin" />
        </div>
    );
}

export default ListPage
