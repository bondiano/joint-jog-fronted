import React from 'react';
import PropTypes from 'prop-types'
import { Typography, Card, withStyles, CardContent, CardActions, CardHeader, Avatar, IconButton, Divider } from 'material-ui';

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
        return (
            <Card className={classes.rootInfo}>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar}>
                            {this.props.data.username && this.props.data.username.charAt(0)}
                        </Avatar>
                    }
                    action={
                        <IconButton className={classes.icon} onClick={this.props.changeFormType}>
                            {this.props.isCurrentUser && <img src={setIcon} alt="Edit" />}
                        </IconButton>
                    }
                    title={<b>{`${!!this.props.data.firstName ? this.props.data.firstName : ''} ${!!this.props.data.lastName ? this.props.data.lastName : ''}`}</b>}
                    subheader={this.props.data.username}
                />

                <CardContent>
                    {this.props.data.age && <Typography><b>Возраст:</b> {this.props.data.age}</Typography>}
                    {this.props.data.sex === 'female' && <Typography><b>Пол:</b> женский</Typography>}
                    {this.props.data.sex === 'male' && <Typography><b>Пол:</b> мужской</Typography>}
                </CardContent>

                <CardActions disableActionSpacing>
                    <IconButton>
                        {this.props.data.socialNetworks &&
                        (this.props.data.socialNetworks.find(sc => sc.type === 'vk')) &&
                        <a href={(this.props.data.socialNetworks.find(sc => sc.type === 'vk')).url}>
                            <img width="28" src={vk} alt="vk"/>
                        </a>}

                    </IconButton>
                    <IconButton>
                        {this.props.data.socialNetworks &&
                        (this.props.data.socialNetworks.find(sc => sc.type === 'facebook')) &&
                        <a href={(this.props.data.socialNetworks.find(sc => sc.type === 'facebook')).url}>
                            <img width="28" src={fb} alt="facebook"/>
                        </a>}
                    </IconButton>
                    <IconButton>
                        {this.props.data.socialNetworks &&
                        (this.props.data.socialNetworks.find(sc => sc.type === 'twitter')) &&
                        <a href={(this.props.data.socialNetworks.find(sc => sc.type === 'twitter')).url}>
                            <img width="28" src={tw} alt="vk"/>
                        </a>}
                    </IconButton>
                </CardActions>



            </Card>
        );
    }
}


export default withStyles(ProfileStyles)(ProfileInfo);


