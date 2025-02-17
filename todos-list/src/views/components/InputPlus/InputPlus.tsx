import React, { useCallback, useState } from "react";

import styles from "./index.module.scss";

interface InputPlusProps {
  onAdd: (title: string) => void;
}

export const InputPlus: React.FC<InputPlusProps> = ({ onAdd }) => {

    const [inputValue, setInputValue] = useState('')
    const addTask = useCallback(() => {
        onAdd(inputValue);
        setInputValue('')
    }, [inputValue])



  return (
    <div className={styles.inputPlus}>
      <input 
            type="text" 
            className={styles.inputPlusTitle} 
            placeholder="Type text here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
                if(e.key === 'Enter'){
                    addTask();
                }
            }}
        />
      <button 
            className={styles.inputPlusButton} 
            onClick={() => {
                addTask();
            }}
            aria-label='Add'
        />
    </div>
  );
};
