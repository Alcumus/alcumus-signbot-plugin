import React from 'react'

import { ButtonPanel, ButtonPanelButton, Spacer } from './button-layout'

import { MdEdit, MdRedo, MdSave } from 'react-icons/md'

import { useSignature } from './use-signature'

import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'

export function Signature({ border = 'none', image = '', onSaveCB = () => { }, strokeStyle }) {
    const canvas = React.useRef()

    const { isReady, onSave, onClear, onEdit, saved } = useSignature({
        canvas,
        image,
        onSaveCB,
        strokeStyle,
    })

    const isDisabled = !isReady

    return (
        <React.Fragment>
            <Box
                alignItems="stretch"
                display="flex"
                flexDirection="row"
                height="100%"
                justifyContent="stretch"
                style={{ border: border }}
                width="100%"
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
