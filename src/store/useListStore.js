import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useListStore = create(
    (set) => ({

        lists: [],
        selectedList: null,
        isListsLoading: false,
        isCreatingList: false,
        isGettingList: false,
        isDeletingList: false,

        selectedTodo: null,
        isCreatingTodo: false,
        isGettingTodo: false,
        isUpdatingTodo: false,
        isDeletingTodo: false,

        // For list controller => 
        getLists: async () => {
            set({ isListsLoading: true });

            try {
                const res = await axiosInstance.get("lists/");
                set({ lists: res.data.data });
            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                set({ isListsLoading: false });
            }
        },

        newList: async (data) => {
            set({ isCreatingList: true });

            try {

                const res = await axiosInstance.post("lists/", data);
                const listItem = res.data;
                set((state) => (
                    {
                        lists: [...state.lists, listItem.data]

                    }));
                toast.success("List added successfully");

            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                set({ isCreatingList: false });
            }
        },

        getListById: async (listID) => {
            set({ isGettingList: true });

            try {

                const res = await axiosInstance.get(`lists/${listID}`);
                set({ selectedList: res.data });

            } catch (error) {
                set({ selectedList: null });
                toast.error(error);
            } finally {
                set({ isGettingList: false });
            }
        },

        deleteListById: async (listID) => {
            set({ isDeletingList: true });

            try {

                const res = await axiosInstance.delete(`lists/${listID}`);

                set((state) => {
                    const updatedList = state.lists.filter((list) => (
                        list._id !== listID
                    ));

                    return { lists: updatedList };
                })

                toast.success("List deleted successfully");

            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                set({ isDeletingList: false });
            }
        },


        // For Todo Controller =>

        addNewTodo: async (listID, data) => {
            set({ isCreatingTodo: true });

            try {

                const res = await axiosInstance.post(`lists/${listID}/todos/add`, data);
                const newTodo = res.data;

                set((state) => {
                    if (!state.selectedList) {
                        return {};
                    }

                    const updatedTodos = [...state.selectedList.data.todos, newTodo.data];

                    const updatedSelectedList = {
                        ...state.selectedList,
                        data: {
                            ...state.selectedList.data,
                            todos: updatedTodos,
                        }
                    }

                    return { selectedList: updatedSelectedList };
                });

                toast.success("Todo added successfully");

            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                set({ isCreatingTodo: false });
            }
        },

        fetchTodoByID: async (listID, todoID) => {
            set({ isGettingTodo: true });

            try {

                const res = await axiosInstance.get(`lists/${listID}/todos/${todoID}`);
                set({ selectedTodo: res.data });

            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                set({ isGettingTodo: false });
            }
        },

        updateTodoAsComplete: async (listID, todoID) => {
            set({ isUpdatingTodo: true });

            try {
                const res = await axiosInstance.patch(`lists/${listID}/todos/${todoID}/update`);

                const updatedTodoToggle = res.data.data;

                set((state) => {

                    const newState = {};

                    if (state.selectedList && state.selectedList.data) {
                        const updatedTodos = state.selectedList?.data.todos.map((todo) =>
                            todo._id === todoID ? updatedTodoToggle : todo
                        );

                        newState.selectedList = {
                            ...state.selectedList,
                            data: {
                                ...state.selectedList.data,
                                todos: updatedTodos,
                            }
                        }
                    };

                    newState.selectedTodo = {
                        ...state.selectedTodo,
                        data: updatedTodoToggle,
                    }

                    return newState;
                });

                toast.success(updatedTodoToggle.isComplete ? "Todo updated as complete" : "Todo updated as incomplete");

            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                set({ isUpdatingTodo: false });
            }
        },

        deleteTodo: async (listID, todoID) => {
            set({ isDeletingTodo: true });

            try {

                const res = await axiosInstance.delete(`lists/${listID}/todos/${todoID}/delete`);

                set((state) => {

                    if (!state.selectedList) {
                        return { selectedTodo: null };
                    }

                    const updatedTodos = state.selectedList.data.todos.filter(
                        (todo) => todo._id !== todoID
                    );

                    const updatedSelectedList = {
                        ...state.selectedList,
                        data: {
                            ...state.selectedList.data,
                            todos: updatedTodos,
                        }
                    };

                    return { selectedList: updatedSelectedList, selectedTodo: null };
                });

                toast.success("Todo deleted successfully");

            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message);
            } finally {
                set({ isDeletingTodo: false });
            }
        },

        clearSelectedTodo: () => set({ selectedTodo: null }),
    })
);