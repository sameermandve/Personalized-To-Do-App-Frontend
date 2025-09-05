import { useNavigate, useParams } from "react-router-dom";
import { useListStore } from "../store/useListStore"
import { useEffect, useMemo } from "react";
import { CalendarDays, Check, List, Loader, Trash2, X } from "lucide-react";

function TodoPage() {

    const { deleteTodo, isDeletingTodo, selectedTodo, fetchTodoByID, lists, getLists, updateTodoAsComplete, clearSelectedTodo } = useListStore();

    const { listId, todoId } = useParams();

    // It finds the current list from the lists array
    const currentList = useMemo(() => {
        return lists.find(list => list._id === listId);
    }, [lists, listId]);

    const currentListName = currentList ? currentList.listName : "No list found";

    // this useEffect fetches the todo by ID and fills the data of the todo in selectedTodo
    useEffect(() => {
        if (listId && todoId) {
            fetchTodoByID(listId, todoId);
        }

        return () => {
            clearSelectedTodo();
        }
    }, [listId, todoId, fetchTodoByID, clearSelectedTodo]);

    // this useEfect is used to fetch lists into lists array if its value is 0
    useEffect(() => {
        if (lists.length === 0) {
            getLists();
        }
    }, [lists, getLists]);

    const navigate = useNavigate();

    const handleClick = async () => {
        await deleteTodo(listId, todoId);

        navigate("/");
    }

    // styling & format purpose only
    const upperCase = {
        HIGH: "High",
        MEDIUM: "Medium",
        LOW: "Low",
    }
    const bgPriority = {
        HIGH: "bg-error",
        MEDIUM: "bg-warning",
        LOW: "bg-success",
    }
    const dueDate = selectedTodo?.data?.due_date;
    const todoDescription = selectedTodo?.data?.description || "";
    const sentences = todoDescription.split(".").filter(sentence => sentence !== "");
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = { year: "numeric", month: "long", day: "numeric" };

        return date.toLocaleDateString("en-US", options);
    }


    if (!selectedTodo) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }

    return (
        <div className="h-screen">
            <div className="flex items-center justify-center pb-6 sm:pb-12 pt-25 px-6">
                <div className="w-full max-w-xl">
                    {/* Todo Card */}
                    <div className="w-full bg-base-content/20 border-2 border-base-content/50 rounded-lg py-6 px-5 sm:px-6 space-y-8">
                        {/* Todo card header */}
                        <div className="flex items-center justify-between">
                            <h1 className="text-base-content font-bold text-xl sm:text-2xl lg:text-3xl flex-1 overflow-hidden whitespace-nowrap text-ellipsis">{selectedTodo?.data?.title}</h1>
                            <div className={`shrink-0 ${bgPriority[selectedTodo?.data?.priority]} py-1 px-3 rounded-2xl`}>
                                <span className="text-sm text-base-content font-semibold">{ upperCase[selectedTodo?.data?.priority] } Priority</span>
                            </div>
                        </div>
                        {/* Todo card header end */}

                        {/* Todo card description */}
                        <div className="border-b-3 border-base-content/10 pb-7">
                            {selectedTodo?.data?.description ?
                                (
                                    sentences.map((line, i) => (
                                        <p
                                            key={i}
                                            className="mb-1 text-base-content/60 font-medium">{line.trim() + "."}
                                        </p>
                                    ))
                                ) :
                                (
                                    <p className="mb-1 text-base-content/60 font-medium">No description available</p>
                                )}
                        </div>
                        {/* Todo card description end */}

                        {/* Todo card due Date and belonging list */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="size-4 text-base-content/70" />
                                <p className="text-sm text-base-content/70 font-semibold">
                                    Due Date: 
                                    <span className="font-medium pl-1 text-base-content">{formatDate(dueDate)}</span>
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <List className="size-4 text-base-content/70" />
                                <p className="text-sm text-base-content/70 font-semibold">List: 
                                    <span className="font-medium pl-1 text-base-content">{ currentListName }</span>
                                </p>
                            </div>
                        </div>
                        {/* Todo card due Date and belonging list end */}

                        <div className="flex items-center justify-end gap-2">
                            <button
                                onClick={handleClick}
                                className="btn btn-error flex items-center gap-2"
                                disabled={isDeletingTodo}
                            >
                                <Trash2 className="size-4 text-black" />
                                <span className="text-black font-semibold">Delete</span>
                            </button>
                            <button
                                onClick={() => updateTodoAsComplete(listId, todoId)}
                                className={`btn ${selectedTodo?.data?.isComplete ? `btn-error` : `btn-success`} flex items-center gap-2`}
                            >
                                { selectedTodo?.data?.isComplete ? (<X className="size-4 text-black" />) : (<Check className="size-4 text-black" />) }
                                <span className="text-black font-semibold">
                                    { selectedTodo?.data?.isComplete ? ("Mark as Incomplete") : ("Mark as Complete") }
                                </span>
                            </button>
                        </div>
                    </div>
                    {/* Todo Card end */}
                </div>
            </div>
        </div>
    );
}

export default TodoPage
