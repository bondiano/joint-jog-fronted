import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Card, withStyles, CardContent, CardActions, CardHeader, Avatar, IconButton } from 'material-ui';

import { ProfileStyles } from './ProfileStyles';
import {vk, tw, fb, setIcon} from '../assets';

class ProfileInfo extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        isSending: PropTypes.bool.isRequired,
        data: PropTypes.object.isRequired,
        isCurrentUser: PropTypes.bool.isRequired,
        changeFormType: PropTypes.func
    };

    render() {
        const {classes} = this.props;
        const socialNetworks = {
            vk: (url) => <a href={url}><img width="32" src={vk} alt="vk"/></a>,
            facebook: (url) => <a href={url}><img width="32" src={fb} alt="fb"/></a>,
            twitter: (url) => <a href={url}><img width="32" src={tw} alt="tw"/></a>
        };
        return (
            <Card className={classes.rootInfo}>
                <CardHeader
                    avatar={
                        <Avatar>
                            {this.props.data.username && this.props.data.username[0]}
                        </Avatar>
                    }
                    action={
                        this.props.isCurrentUser &&
                        <IconButton className={classes.icon} onClick={this.props.changeFormType}>
                            <img src={setIcon} alt="Edit" />
                        </IconButton>
                    }
                    title={`${this.props.data.firstName || ''} ${this.props.data.lastName || ''}`}
                    subheader={this.props.data.username}
                />
                <CardContent>
                    {this.props.data.age && <Typography><b>Возраст:</b> {this.props.data.age}</Typography>}
                    {this.props.data.sex && <Typography><b>Пол:</b> {this.props.data.sex === 'male' ? 'мужской' : 'женский'} </Typography>}
                </CardContent>
                <CardActions disableActionSpacing>
                    {this.props.data.socialNetworks && this.props.data.socialNetworks.map((sc, index) => {
                        return socialNetworks[sc.type] && 
                        (<div key={`${sc.type}-${index}`}>
                            {socialNetworks[sc.type](sc.url)}
                        </div>);
                    })}
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(ProfileStyles)(ProfileInfo);


