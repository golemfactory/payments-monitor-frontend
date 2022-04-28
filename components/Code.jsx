import React from "react"
import styled from "styled-components"
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/nightOwl"
import Confetti from "react-dom-confetti"

const Pre = styled.pre`
  text-align: left;
  overflow: scroll;
`

const Line = styled.div`
  display: table-row;
`

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1rem;
  user-select: none;
  opacity: 0.5;
`

const LineContent = styled.span`
  display: table-cell;
`

const Button = (props) => (
  <button
    style={{
      position: "absolute",
      top: 0,
      right: 0,
      border: "none",
      boxShadow: "none",
      textDecoration: "none",
      margin: "8px",
      padding: "8px 12px",
      background: "#E2E8F022",
      color: "white",
      borderRadius: "8px",
      cursor: "pointer",
      color: "#E2E8F0",
      fontSize: "14px",
      fontFamily: "sans-serif",
      lineHeight: "1",
    }}
    {...props}
  />
)

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
}

const copyToClipboard = (str) => {
  const el = document.createElement("textarea")
  el.value = str
  el.setAttribute("readonly", "")
  el.style.position = "absolute"
  el.style.left = "-9999px"
  document.body.appendChild(el)
  el.select()
  if ("clipboard" in navigator) {
    navigator.clipboard.writeText(el.value)
  } else {
    document.execCommand("copy", true, el.value)
  }
  document.body.removeChild(el)
}

export default function Code(props) {
  const [isCopied, setIsCopied] = React.useState(false)
  const center = props.center
  return (
    <>
      <Confetti className="z-40 w-full left-52" active={isCopied} config={config} />
      {center ? (
        <div className="grid grid-cols-12">
          <Highlight {...defaultProps} theme={theme} code={props.code} language={props.language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <Pre className={(className, "rounded-l-lg  relative p-4 col-span-10 overflow-scroll")} style={style}>
                {tokens.map((line, i) => (
                  <Line key={i} {...getLineProps({ line, key: i })}>
                    {props.showLines ? <LineNo>{i + 1}</LineNo> : null}
                    <LineContent>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </LineContent>
                  </Line>
                ))}
              </Pre>
            )}
          </Highlight>
          <button
            className="bg-gray-900 rounded-r-lg col-span-2 block text-white border-l"
            onCopy={(e) => {
              e.preventDefault()
              return false
            }}
            onClick={() => {
              copyToClipboard(props.code)
              setIsCopied(true)
              setTimeout(() => setIsCopied(false), 3000)
            }}
          >
            {isCopied ? "🎉 Copied!" : "Copy"}
          </button>
        </div>
      ) : (
        <Highlight {...defaultProps} theme={theme} code={props.code} language={props.language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Pre className={(className, "rounded-lg  relative p-2")} style={style}>
              <Button
                onClick={() => {
                  copyToClipboard(props.code)
                  setIsCopied(true)
                  setTimeout(() => setIsCopied(false), 3000)
                }}
              >
                {isCopied ? "🎉 Copied!" : "Copy"}
              </Button>
              {tokens.map((line, i) => (
                <Line key={i} {...getLineProps({ line, key: i })}>
                  <LineNo>{i + 1}</LineNo>
                  <LineContent>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </LineContent>
                </Line>
              ))}
            </Pre>
          )}
        </Highlight>
      )}
    </>
  )
}
