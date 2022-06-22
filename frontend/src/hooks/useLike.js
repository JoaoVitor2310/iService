//Objective: handle with the like button
//Hooks
import { useDispatch } from "react-redux";
import { useResetComponentMessage } from "./useResetComponentMessage";

//Redux
import {like} from "../slices/photoSlice";

export const useLike = (photo) => {
    const dispatch = useDispatch();
    const resetMessage = useResetComponentMessage(dispatch);
    
    return () => {
        dispatch(like(photo._id));
        resetMessage();
    }
    
}