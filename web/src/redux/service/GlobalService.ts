import {
  pushCommentSectionId,
  removeCommentSectionId,
  setLoadingSlice,
  setSearchSlice,
  setToggleCommentsSlice,
} from "../features/global.slice";
import { Dispatch } from "../store";

export default class GlobalService {
  setLoading(payload: boolean) {
    Dispatch(setLoadingSlice(payload));
  }

  setToggleComments(payload: boolean) {
    Dispatch(setToggleCommentsSlice(payload));
  }

  setSearch(payload: string) {
    Dispatch(setSearchSlice(payload));
  }

  removeCommentSectionId(payload: number) {
    Dispatch(removeCommentSectionId(payload));
  }

  pushCommentSectionId(payload: number) {
    Dispatch(pushCommentSectionId(payload));
  }
}
