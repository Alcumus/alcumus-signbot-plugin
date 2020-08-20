import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import { makeTestId } from 'common/component-utilities'

export const ButtonPanel = ({ vertical = true, ...props }) => {
    return (
        <Box
            alignItems={vertical ? 'stretch' : 'space-between'}
            display="flex"
            flexDirection={vertical ? 'column' : 'row'}
            justifyContent={vertical ? 'space-between' : 'stretch'}
            {...props}
        />
    )
}

export const ButtonPanelButton = ({ label, icon, onClick = () => { }, dataTestId, ...props }) => {
    return (
        <Box display="flex" flexGrow="1">
            <Button
                color="primary"
                data-testid={dataTestId || makeTestId(`${label}-button`)}
                endIcon={icon}
                onClick={onClick}
                style={{ width: '100%', height: '100%' }}
                variant="contained"
                {...props}
            >
                {label}
            </Button>
        </Box>
    )
}

const SPACER_DEFAULT = '1px'
export const Spacer = ({ st = SPACER_DEFAULT, sr = 0, sb = SPACER_DEFAULT, sl = 0 }) => (
    <Box pt={st} pr={sr} pb={sb} pl={sl} />
)
