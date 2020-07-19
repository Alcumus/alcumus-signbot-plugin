import React from 'react'

import { ButtonPanel, ButtonPanelButton, Spacer } from './button-layout'

import { MdEdit, MdRedo, MdSave } from 'react-icons/md'

import { useSignature } from './use-signature'

import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'

export function Signature({ border = 'none', image = '', onSaveCB }) {
    const canvas = React.useRef()

    const { isReady, onSave, onClear, onEdit, saved } = useSignature({
        canvas,
        image,
        onSaveCB,
    })

    const isDisabled = !isReady

    return (
        <React.Fragment>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="stretch"
                justifyContent="stretch"
                width="100%"
                height="100%"
                style={{ border: border }}
            >
                <Box display="flex" flexDirection="column" width="100%" position="relative">
                    <Card>
                        {saved ? (
                            <img src={saved} style={{ width: '100%', height: '100%' }} />
                        ) : (
                            <canvas ref={canvas} />
                        )}
                    </Card>
                    <ButtonPanel vertical={false} width="100%">
                        {saved ? (
                            <ButtonPanelButton label={'Edit'} icon={<MdEdit />} onClick={onEdit} />
                        ) : (
                            <>
                                <ButtonPanelButton
                                    disabled={isDisabled}
                                    label={'Reset'}
                                    icon={<MdRedo />}
                                    onClick={onClear}
                                />
                                <Spacer />
                                <ButtonPanelButton
                                    disabled={isDisabled}
                                    label={'Save'}
                                    icon={<MdSave />}
                                    onClick={onSave}
                                />
                            </>
                        )}
                    </ButtonPanel>
                </Box>
            </Box>
        </React.Fragment>
    )
}
