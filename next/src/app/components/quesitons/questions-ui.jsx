'use client'
import { CSSTransition } from 'react-transition-group';
import clsx from 'clsx';
import { useAppState } from '@/app/context';

import { QuestionsFilter } from './questions-filter';
import stylesQuestions from './questions.module.scss';
import stylesUi from './questionsUi.module.scss';
import { useQuestionsNavigation } from '../utils/questions-utils';

export const QuestionsVisible = ({questions, repeatQuestion, memorizedQuestions, onFilterQuestions, filter}) => {
    const { handleId, onSelectQuestionsId } = useQuestionsNavigation();

    return (
        <div style={{width: '50%'}}>
            <QuestionsFilter 
                onFilterQuestions={onFilterQuestions}
                filter={filter}
            />
            <div className={stylesQuestions.questions__list}>
                <ol>
                    {questions.length === 0 ? (
                        <p>No questions added yet. To start revising, add the questions you're interested in, and they will appear here.</p>
                    ) :                     
                    questions.map(item => {
                        const itemId = item.question_id;                  
                        return <li 
                                    key={itemId}
                                    className= {clsx(
                                        [stylesQuestions.questions__item],
                                        {
                                            [stylesQuestions.questions__item_selected]: handleId === itemId,
                                            [stylesQuestions.repeat]: repeatQuestion.includes(itemId),
                                            [stylesQuestions.memorized]: memorizedQuestions.includes(itemId)
                                        }
                                    )}
                                    onClick={() => onSelectQuestionsId(itemId)}>{item.question}</li>
                    })}
                </ol>
            </div>
        </div>
)};

export const QuestionsHidden = ({questions, repeatQuestion, memorizedQuestions, onFilterQuestions, filter}) => {
    const { burgerToggle, onToggleBurger } = useAppState();
    const { handleId, onSelectQuestionsId } = useQuestionsNavigation();
    
    return (
        <div>
            <CSSTransition
                in={burgerToggle}
                timeout={300}
                classNames={{
                    enter: stylesUi.menu_enter,
                    enterDone: stylesUi.menu_enter_done,
                    exit: stylesUi.menu_exit,
                    exitDone: stylesUi.menu_exit_done,
                  }}>
                    <div className={stylesUi.menu} onClick={onToggleBurger}>
                        
                        <div className={stylesUi.menu__content} onClick={e => e.stopPropagation()}>
                            <QuestionsFilter 
                                onFilterQuestions={onFilterQuestions}
                                filter={filter}
                            />
                            <div className={stylesQuestions.questions__list}>
                            <ol>                                
                                {questions.map(item => {
                                    const itemId = item.question_id;    
                                    return <li 
                                                key={itemId}
                                                className= {clsx(
                                                    [stylesQuestions.questions__item],
                                                    {
                                                        [stylesQuestions.questions__item_selected]: handleId === itemId,
                                                        [stylesQuestions.repeat]: repeatQuestion.includes(itemId),
                                                        [stylesQuestions.memorized]: memorizedQuestions.includes(itemId)
                                                    }
                                                )}
                                                onClick={() => {
                                                    onSelectQuestionsId(itemId)
                                                    onToggleBurger()}}>{item.question}</li>
                                })}
                            </ol>
                        </div>
                        </div>
                        <div className={stylesUi.blur}/>
                    </div>
            </CSSTransition>
        </div>
    )
}