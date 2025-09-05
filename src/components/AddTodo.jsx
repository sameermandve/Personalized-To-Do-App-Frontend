import { Calendar, NotebookPen, Pen, Plus, SquarePen } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast";
import { useListStore } from "../store/useListStore";

function AddTodo(props) {
    const { addNewTodo, isCreatingTodo } = useListStore();

    const [todoData, setTodoData] = useState({
        title: "",
        description: "",
        priority: "MEDIUM",
        due_date: "",
    });

    const validateTodoData = () => {
        if (!todoData.title.trim()) return toast.error("Todo title is required");
        if (!todoData.due_date.trim()) return toast.error("Due date is required");

        return true;
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();

        const success = validateTodoData();

        if (success === true) {
            await addNewTodo(props.id, todoData);

            setTodoData({
                title: "",
                description: "",
                priority: "MEDIUM",
                due_date: "",
            });
        }
    };

    return (
        <div className="space-y-6 border-2 border-base-content/50 bg-base-content/10 p-4 rounded-xl max-w-3xl mx-auto">
            {/* flex flex-col sm:flex-row gap-3 */}
            <form onSubmit={handleAddTodo} className="flex flex-col sm:grid sm:grid-cols-3 gap-3">
                {/* Todo name */}
                <div className="flex">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 z-10 flex items-center pointer-events-none pl-3">
                            <Pen className="size-5 text-base-content/70" />
                        </div>
                        <input
                            type="text"
                            className="w-full input input-bordered pl-12 font-medium focus:outline-none focus:ring-2 focus:ring-base transition duration-0 focus:duration-200"
                            placeholder="Task name"
                            value={todoData.title}
                            onChange={(e) => setTodoData({ ...todoData, title: e.target.value })}
                        />
                    </div>
                </div>
                {/* Todo name end */}

                {/* Priority */}
                <div className="flex">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 z-10 flex items-center pointer-events-none pl-3">
                            <NotebookPen className="size-5 text-base-content/70" />
                        </div>
                        <select
                            className="select select-bordered pl-12 w-full font-medium focus:outline-none focus:ring-2 focus:ring-base transition duration-0 focus:duration-200"
                            value={todoData.priority}
                            onChange={(e) => setTodoData({ ...todoData, priority: e.target.value })}
                        >
                            <option disabled={true} value="">Select Priority</option>
                            <option value="HIGH">HIGH</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="LOW">LOW</option>
                        </select>
                    </div>
                </div>
                {/* Priority end */}

                {/* Due date */}
                <div className="flex">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 z-10 flex items-center pointer-events-none pl-3">
                            <Calendar className="size-5 text-base-content/70" />
                        </div>
                        <input
                            type="date"
                            className="w-full input input-bordered pl-12 font-medium focus:outline-none focus:ring-2 focus:ring-base transition duration-0 focus:duration-200"
                            placeholder="Task name"
                            value={todoData.due_date}
                            onChange={(e) => setTodoData({ ...todoData, due_date: e.target.value })}
                        />
                    </div>
                </div>
                {/* Due date end */}

                {/* Description field */}
                <div className="sm:col-span-3">
                    <div className="relative w-full">
                        <div className="absolute top-3 left-0 z-10 flex items-center pointer-events-none pl-3">
                            <SquarePen className="size-5 text-base-content/70" />
                        </div>
                        <textarea
                            className="textarea w-full textarea-bordered pl-12 font-medium focus:outline-none focus:ring-2 focus:ring-base transition duration-0 focus:duration-200"
                            placeholder="Description"
                            value={todoData.description}
                            onChange={(e) => setTodoData({ ...todoData, description: e.target.value })}
                        ></textarea>
                    </div>
                </div>
                {/* Description field end */}

                {/* submit btn */}
                <button
                    type="submit"
                    className="btn btn-primary sm:col-span-3"
                    disabled={isCreatingTodo}
                >
                    <Plus className="size-4 text-base-100" />
                    <span>Add Task</span>
                </button>
                {/* submit btn end */}
            </form>
        </div>
    )
}

export default AddTodo