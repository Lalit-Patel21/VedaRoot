import { Contact } from "../models/contact.model.js";

class ContactService {
  static async createContact(contactData) {
    try {
      const newContact = new Contact(contactData);
      return await newContact.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllContacts() {
    try {
      return await Contact.find().populate("userId");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getContactById(id) {
    try {
      return await Contact.findById(id).populate("userId");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateContactStatus(id, status) {
    try {
      return await Contact.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      ).populate("userId");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteContact(id) {
    try {
      return await Contact.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ContactService;
