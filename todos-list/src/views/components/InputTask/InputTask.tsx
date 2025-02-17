import React, { useEffect, useRef, useState } from "react";

import styles from "./index.module.scss";
import { useToDoStore } from "../../../data/stores/useToDoStore";

interface InputTaskProps {
  id: string;
  title: string;
  onDone: (id: string, title: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
  id,
  title,
  onDone,
  onEdited,
  onRemoved,
}) => {

    const [checked, setChecked] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [valueEdit, setValueEdit] = useState(title)
    const editTitleInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(isEditMode){
            editTitleInputRef?.current?.focus()
        }
    }, [isEditMode])

  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input 
            type="checkbox"
            disabled={isEditMode}
            checked={checked}
            className={styles.InputTaskCheckbox}
            onChange={(e) => {
                setChecked(e.target.checked)
                if(e.target.checked){
                    setTimeout(() => {
                        onDone(id, title);
                    }, 500)
                }
            }}
        />
        {
            isEditMode ? (
                <input 
                    value={valueEdit}
                    ref={editTitleInputRef}
                    onChange={(e) => setValueEdit(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key ==='Enter'){
                            onEdited(id, valueEdit)
                            setIsEditMode(false)
                        }
                    }}
                    className={styles.inputTaskTitleEdit}
                />
            ) : (
                <h3 className={styles.inputTaskTitle}>{title}</h3>
            )
        }
      </label>
      {
        isEditMode ? (
            <button 
                aria-label="Save"
                className={styles.inputTaskSave}
                onClick={() => {
                    onEdited(id, valueEdit)
                    setIsEditMode(false)
                }}
            />
        ) : (
            <button 
                aria-label="Edit"
                className={styles.inputTaskEdit}
                onClick={() => {
                    setIsEditMode(true)
                }}
            />
        )
      }
      <button 
        aria-label="Remove"
        className={styles.inputTaskRemove}
        onClick={() => {
            if(confirm('Are you sure?')){
                onRemoved(id)
            }
        }}
      />
    </div>
  );
};
