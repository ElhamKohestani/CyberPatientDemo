import React from 'react'

export default function UploadAssetLable() {
    const lableStyle: React.CSSProperties = {

        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "38.7858px",
        lineHeight: "47px",
        textAlign: "center",
        color: "#000000",
        opacity: "0.3",
    }
    return (
        <div style={lableStyle}>
            <label>
                No Assets found.
                Upload files to the “Upload” tab
            </label>
        </div>

    )
}
