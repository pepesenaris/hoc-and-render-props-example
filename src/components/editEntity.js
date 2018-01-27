import moment from "moment";
import { withStateHandlers, withHandlers } from "recompose";

const editRecentEntity = (interval = 10, intervalUnit = "minutes") =>
  compose(
    withStateHandlers(
      { isEditing: false, editingEntityId: null },
      {
        toggleEditing: ({ isEditing }) => entryId => {
          return { isEditing: !isEditing, editingEntityId: isEditing ? null : entryId };
        }
      }
    ),
    withHandlers({
      isSelectedForEditing: ({ editingEntityId }) => entry => entry.id === editingEntityId,
      showEditButton: ({ isEditing, editingEntityId }) => entry => {
        const now = moment();
        const createdAt = moment(entry.created_at);
        const isRecentEntity = now.diff(createdAt, intervalUnit) <= interval;
        return isRecentEntity || (isEditing && entry.id === editingEntityId);
      },
      handleEntrySave: ({
        isEditing,
        editingEntityId,
        onCreateEntity,
        onEditEntity,
        list
      }) => values => {
        if (isEditing) {
          const entry = list && list.find(entry => entry.id === editingEntityId);
          return onEditEntity(entry.id, values);
        } else return onCreateEntity(values);
      }
    })
  );

export default editRecentEntity;
