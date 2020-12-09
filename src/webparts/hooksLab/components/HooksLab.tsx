import * as React from 'react';
import styles from './HooksLab.module.scss';
import { IHooksLabProps } from './IHooksLabProps';
import FormEditor from './formEditor/FormEditor';
import TodoListEditor from './todoList/TodoListEditor';

export default class HooksLab extends React.Component<IHooksLabProps, {}> {
  public render(): React.ReactElement<IHooksLabProps> {
    return (
      <div className={ styles.hooksLab }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={styles.column}>
              <FormEditor></FormEditor>
            </div>
          </div>
          <div className={ styles.row }>
            <div className={styles.column}>
              <TodoListEditor></TodoListEditor>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
