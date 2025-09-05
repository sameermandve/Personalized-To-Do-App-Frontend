import { ListPlus, NotebookTabs } from "lucide-react";
import { useState } from "react";
import { useListStore } from "../store/useListStore";
import toast from "react-hot-toast";

export const AddList = () => {

    const { newList, isCreatingList } = useListStore();

    const [listData, setListData] = useState({
        listName: "",
        listDesc: "",
    });

    const validateListInfo = () => {
        if (!listData.listName.trim()) return toast.error("List name required");
        if (!listData.listDesc.trim()) return toast.error("List description required");

        return true;
    }

    const handleCreateListSubmit = async (e) => {
        e.preventDefault();

        const success = validateListInfo();

        if (success === true) {
            await newList(listData);

            setListData({
                listName: "",
                listDesc: "",
            });
        }
    }

    return (
        <>
            <div className="space-y-6 border-2 border-base-content/50 bg-base-content/10 p-4 rounded-xl w-full">
                <div className="text-center">
                    <h1 className="text-2xl text-primary/90 font-semibold tracking-wide">Add new list</h1>
                </div>
                {/* Form Field */}
                <form onSubmit={handleCreateListSubmit} className="flex flex-col lg:flex-row gap-3">
                    {/* List name field */}
                    <div className="flex flex-1">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 z-10 flex items-center pointer-events-none pl-3">
                                <ListPlus className="size-5 text-base-content/70" />
                            </div>
                            <input
                                type="text"
                                className="w-full input input-bordered pl-12 font-medium focus:outline-none focus:ring-2 focus:ring-base transition duration-0 focus:duration-200"
                                placeholder="List name"
                                value={listData.listName}
                                onChange={(e) => setListData({...listData, listName: e.target.value})}
                            />
                        </div>
                    </div>
                    {/* List name field end */}

                    {/* List desc field */}
                    <div className="flex flex-1">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 z-10 flex items-center pointer-events-none pl-3">
                                <NotebookTabs className="size-5 text-base-content/70" />
                            </div>
                            <input
                                type="text"
                                className="w-full input input-bordered pl-12 font-medium focus:outline-none focus:ring-2 focus:ring-base transition duration-0 focus:duration-200"
                                placeholder="List description"
                                value={listData.listDesc}
                                onChange={(e) => setListData({...listData, listDesc: e.target.value})}
                            />
                        </div>
                    </div>
                    {/* List desc field end */}

                    {/* Submit btn */}
                    <div className="flex-1">
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isCreatingList}
                        >
                            {isCreatingList ? "Creating list..." : "Create new list"}
                        </button>
                    </div>
                    {/* Submit btn end */}
                </form>
                {/* Form Field end */}
            </div>
        </>
    );
}
