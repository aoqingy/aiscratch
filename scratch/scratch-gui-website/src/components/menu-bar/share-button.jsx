import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button/button.jsx';

import styles from './share-button.css';

const ShareButton = ({
    className,
    isShared,
    onClick,
    buttonName							//aoqingy
}) => (
    <Button
        className={classNames(
            className,
            styles.shareButton,
            {[styles.shareButtonIsShared]: isShared}
        )}
        onClick={onClick}
    >
        {
            buttonName ? buttonName : "发布"
        }
    </Button>
);

ShareButton.propTypes = {
    className: PropTypes.string,
    isShared: PropTypes.bool,
    onClick: PropTypes.func,
    buttonName: PropTypes.string				//aoqingy
};

ShareButton.defaultProps = {
    onClick: () => {}
};

export default ShareButton;
