import React, {useEffect} from 'react';
import classes from './Inspect.module.css';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

// Material UI
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

const Inspect = props => {

    useEffect(() => {
        if (props.numWords < 200 && props.word) {
            props.onResetInspect();
        }
    }, [props.numWords]);

    const ignoreButtonClickedHandler = () => {
        props.onResetInspect();
        props.onAddIgnore(props.word);
    }

    const neuBorder = props.darkMode ? {
        boxShadow: 'inset 4px 4px 10px rgba(0, 0, 0, 0.18), inset -4px -4px 10px rgba(255, 255, 255, 0.015)'
    }
    : {
        boxShadow: 'inset 3px 3px 6px rgba(0, 0, 0, 0.08), inset -3px -3px 6px rgba(255, 255, 255, 0.5)'
    }

    

    if (!props.word) {
        return null;
    }


    return <div className={classes.Inspect} id="inspect">
        <div
        style={{
            color: props.pallete.userInputText,
            ...neuBorder
        }} className={classes.InspectBox}>
            <CloseRoundedIcon onClick={() => props.onResetInspect()} className={classes.CloseIcon}/>
            
            {props.synonyms ? 
                <>
                    <p className={classes.WordSentence}>Possible alternatives for <bold className={classes.Word}>{props.word}</bold>: </p>
                    <p className={classes.Synonyms}>{props.synonyms.join(', ')}</p>
                </>
            : <h3 className={classes.NotFoundMessage}>Sorry! Couldn't find synonyms for {props.word}</h3>}

            <button 
            className={classes.IgnoreButton}
            onClick={ignoreButtonClickedHandler}>
                IGNORE
            </button>

        </div>

    </div>
}

const mapStateToProps = state => {
    return {
        pallete: state.pallete.pallete,
        word: state.inspect.word,
        loadedSynonyms: state.userInput.loadedSynonyms,
        synonyms: state.inspect.synonyms,
        numWords: state.userInput.numWords,
        overused: state.userInput.overused,
        darkMode: state.pallete.darkMode,
        text: state.userInput.text,
        ignoredWords: state.ignore.words
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onResetInspect: () => dispatch({type: actionTypes.RESET_INSPECT}),
        onAddIgnore: ignoredWord => dispatch({type: actionTypes.ADD_IGNORE, word: ignoredWord})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inspect);
