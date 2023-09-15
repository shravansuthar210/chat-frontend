import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
});
const getAllMyParticipant = (phoneNumber) =>
  API.get(`getAllParticipant/${phoneNumber}`);
const getAllmsg = (participantId) => API.get(`getAllMessage/${participantId}`);

const createContact = (formData) => API.post("createContact", formData);

export { API, getAllMyParticipant, getAllmsg, createContact };
