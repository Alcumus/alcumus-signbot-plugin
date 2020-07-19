import React from 'react'
import { makeTestId } from 'common/component-utilities'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

export const ButtonPanel = ({ vertical = true, ...props }) => {
    return (
        <Box
            display="flex"
            justifyContent={vertical ? 'space-between' : 'stretch'}
            alignItems={vertical ? 'stretch' : 'space-between'}
            flexDirection={vertical ? 'column' : 'row'}
            {...props}
        />
    )
}

export const ButtonPanelButton = ({ label, icon, onClick = () => {}, dataTestId, ...props }) => {
    return (
        <Box display="flex" flexGrow="1">
            <Button
                variant="contained"
                color="primary"
                style={{
                    width: '100%',
                    height: '100%',
                }}
                endIcon={icon}
                onClick={onClick}
                data-testid={dataTestId || makeTestId(`${label}-button`)}
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
