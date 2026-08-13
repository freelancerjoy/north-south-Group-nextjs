import { create } from "zustand";
import { createContact, deleteContactApi, getAllContact, getContactById, updateContactApi } from "./contactApi";

export const useContactStore = create((set) => ({
  contacts: [],
  contact: null,
  isLoading: false,

  // Add a contact
  addContact: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await createContact(formData);
      // Update the store with the new contacts
      set((state) => ({
        contacts: [...state.contacts, res.data.data],
        isLoading: false,
      }));

      return res.data.data; // optional: return created contacts
    } catch (err) {
      console.error(err);
      set({ isLoading: false });
      throw err;
    }
  },

  loadContacts: async () => {
    set({ isLoading: true });

    try {
      const res = await getAllContact();

      set({
        contacts: Array.isArray(res?.data) ? res.data : [],
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to load contacts", error);
      set({ contacts: [], isLoading: false });
    }
  },

// Update Contact
  updateContacts: async (id, formData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await updateContactApi(id, formData);

      // Update store: replace the updated NewsEvents
      set((state) => ({
        contacts: state.contacts.map((proj) =>
          proj._id === id ? data : proj
        ),
        isLoading: false,
      }));

      return data;
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

   // Delete a Contact
  deleteContact: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteContactApi(id);
      // Remove the deleted contacts from state
      set({ contacts: get().contacts.filter((p) => p._id !== id), isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
  
   // Load single contacts by ID
  loadContactDetails: async (id) => {
    set({ isLoading: true });
    try {
      const res = await getContactById(id); // fetch from backend
      set({ contactsDetails: res.data, isLoading: false });
    } catch (err) {
      console.error(err);
      set({ isLoading: false, contactsDetails: null });
    }
  },

   clearError: () => set({ error: null }),
      clearMessage: () => set({ message: "" }),
}));
