import React, { useEffect, useState } from 'react';
import memoize from 'lodash/memoize'
import './App.scss';

const gathered = 1613967115931

const parseTimeFrom = memoize((timeStr: string) => {
  const hoursMatch = timeStr.match(/(\d)+H/)
  const hours = (hoursMatch && parseInt(hoursMatch[1])) || 0
  const minutesMatch = timeStr.match(/(\d)+M/)
  const minutes = (minutesMatch && parseInt(minutesMatch[1])) || 0
  const daysMatch = timeStr.match(/(\d)+D/)
  const days = (daysMatch && parseInt(daysMatch[1])) || 0
  return {
    hours: hours,
    minutes: minutes,
    days: days,
  }
})

const VOWEL_SYMBOL = '_'
const CONSONANT_SYMBOL = '$'
const startPatterns = {
  '_$_$': false,
  '$_$_': true,
  '$__$': false,
  '$_0_': false,
  '$_$2_': false,
  '$_$$_': false,
  '$_11$': false,
  '$__$_': false,
  '$o1$': false,
  '$e1$': false,
}
const INITIAL_CONSONANT_DIGRAPHS = [
  'bl',
  'br',
  'ch',
  'cl',
  'cr',
  'dr',
  'fl',
  'fr',
  'gl',
  'gr',
  'ph',
  'pl',
  'pr',
  'qu',
  'sc',
  'sh',
  'sl',
  'sm',
  'sn',
  'sp',
  'st',
  'sw',
  'th',
  'tr',
  'tw',
  'wh',
  'wr',
]

const FINAL_CONSONANT_DIGRAPHS = [
  'ch',
  'ck',
  'gh',
  'lt',
  'st',
  'th',
  'sk',
  'sh',
  'sm',
  'sp',
  'ph',
  'ng',
]

const patternMatch = ((str: string, pattern: string) => {
  // if (str.replace('.com', '').length !== pattern.length) {
  //   return false
  // }
  str = str.replace('.com', '')
  // if (str === "truku") {
  //   debugger
  // }
  for (let patI = 0, strI = 0; strI < str.length; strI++, patI++) {
    if (patI >= pattern.length) {
      return false
    }
    const letter = str[strI]
    const pat = pattern[patI]
    if (pat === CONSONANT_SYMBOL) {
      if (strI === 0) {
        const digraph = str.substr(strI, 2)
        if (INITIAL_CONSONANT_DIGRAPHS.includes(digraph)) {
          strI++
          continue
        }
      } else {
        const digraph = str.substr(strI, 2)
        if (FINAL_CONSONANT_DIGRAPHS.includes(digraph)) {
          strI++
          continue
        }
      }
    }
    if (pat === '*') {
      continue
    }
    if (pat === CONSONANT_SYMBOL) {
      if (!isConsonant(letter)) {
        return false
      }
    } else if (pat === VOWEL_SYMBOL) {
      if (!isVowel(letter)) {
        return false
      }
    } else if (/[0-9]/.test(pat)) {
      if (letter !== str[Number(pat)]) {

        return false
      }
    } else if (letter !== pat) {
      return false
    }
  }
  return true
})

const minute = 60 * 1000
const hour = 60 * minute
const day = 24 * hour
const checkExpired = memoize((domain) => {
  const _gathered = domain.gathered || gathered
  const {hours, minutes, days}  = parseTimeFrom(domain.timeLeft)
  const expires = _gathered + days*day + hours*hour + minutes*minute
  return Date.now() > expires
})

const getTimeLeft = memoize(domain => {
  const _gathered = domain.gathered || gathered
  const {hours, minutes, days}  = parseTimeFrom(domain.timeLeft)
  const expires = _gathered + days*day + hours*hour + minutes*minute
  const left = Date.now() - expires
  const { abs } = Math
  const hoursLeft = abs((left % day) / hour | 0)
  const minutesLeft = abs((left % hour) / minute | 0)
  const daysLeft = abs((left / day | 0))
  return {
    hoursLeft,
    minutesLeft,
    daysLeft,
  }
})


const isVowel = (letter:string) => (
  letter.length === 1 && ['a','e','i','o','u','y'].includes(letter)
)
const isConsonant = (letter:string) => !isVowel(letter)
const priceToNumber = (price:string) => {
  const priceArr = price.split('')
  const result:any = []
  for (const letter of priceArr) {
    if (/[0-9]/.test(letter)) {
      result.push(letter)
    }
  }
  return Number(result.join(''))
}

const perPage = 20000
function App() {
  const [page, setPage] = useState(0)
  const nextPage = () => {
    window.scrollTo(0,0)
    setPage(page + 1)
  }
  const prevPage = () => setPage(Math.max(0, page - 1))

  const [priceLimit, setPriceLimit] = useState(10000)
  const [newPattern, setNewPattern] = useState("")
  const [patterns, _setPatterns] = useState<{[key: string]: boolean}>(() => {
    if (localStorage['patterns']) {
      return JSON.parse(localStorage['patterns'])
    }
    return startPatterns
  })
  const setPatterns = (pat) => {
    localStorage['patterns'] = JSON.stringify(pat)
    _setPatterns(pat)
  }
  const [showPatternsExplanation, setShowPatternsExplanation] = useState(false)
  const [domains, setDomains] = useState<{
    name: string
    price: string
    timeLeft: string
  }[]>([])
  useEffect(() => {
    ;(async() => {
      const resp = await fetch('/gd-scrape/domains.json')
      const domains = await resp.json()
      setDomains(domains)
    })()
  }, [])
  const filterPatterns: string[] = []
  for (const [key, value] of Object.entries(patterns)) {
    if (value) {
      filterPatterns.push(key)
    }
  }
  console.log(filterPatterns)
  const filtered = domains
    .slice(perPage*page, perPage*page + perPage)
    .filter(domain => {
      const { name, price } = domain
      return filterPatterns.some(pattern => patternMatch(name, pattern))
        && priceToNumber(price) < Number(priceLimit)
        && !checkExpired(domain)
    })

  return (
    <div className="App">
      <label className="price-limit">
        price limit: <input
          value={priceLimit}
          onChange={(e:any) => {
            if(!Number.isNaN(Number(e.target.value)))
              setPriceLimit(e.target.value)
          }}
          />
      </label>
      <label className="new-pattern">
        new pattern: <input
          value={newPattern}
          onChange={(e:any) => {
              setNewPattern(e.target.value)
          }}
          />
      </label>
      <div className="btns">
        <button className="add-new-pattern" onClick={() => {
          setPatterns({
            ...patterns,
            [newPattern]: true
          })
          setNewPattern("")
        }}>
          Add Pattern
        </button>
        <button
          className="explanation"
          onClick={() => {
            setShowPatternsExplanation(!showPatternsExplanation)
          }}>
          How Patterns Work
        </button>
      </div>
      {!showPatternsExplanation ? "" : (
        <div>
          <p>
            A '$' represents a consonant. This includes consonant digraphs (th, st, etc.)
          </p>
          <p>
            A '_' represents a vowel.
          </p>
          <p>
            Any letter represents itself.
          </p>
          <p>
            A number represents the 0-indexed character in the string. So, for a domain that's all the same letter, I would make the pattern '$000', that's consonant, then the same consonant, then the same consonant, then the same consonant, e.g. cccc.
          </p>
          <p>
            A '*' can represent any character.
          </p>
        </div>
      )}
      <div className="patterns">
        {Object.entries(patterns).map(([key, value]) => {
          return (
            <label onClick={() => {
              setPatterns({
                ...patterns,
                [key]: !value
              })
            }}>
              <input type="checkbox" checked={value} />
              {key}
            </label>
          )
        })}
      </div>
      <div>
        Page: {page + 1} &nbsp;
        <button onClick={prevPage}>
          Prev Page
        </button>
        <button onClick={nextPage}>
          Next Page
        </button>
      </div>
      <table>
        <tbody>
        {filtered.map(domain => {
          const timeLeft = getTimeLeft(domain)
          const { daysLeft, minutesLeft, hoursLeft } = timeLeft
          return (
            <tr>
              <td>{domain.name}</td>
              <td>{domain.price}</td>
              <td>
                {daysLeft ? `${daysLeft}D ` : ""}
                {hoursLeft ? `${hoursLeft}H ` : ""}
                {minutesLeft ? `${minutesLeft}M ` : ""}
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
      <div>
        Page: {page + 1} &nbsp;
        <button onClick={prevPage}>
          Prev Page
        </button>
        <button onClick={nextPage}>
          Next Page
        </button>
      </div>
    </div>
  );
}

export default App;

(window as any).WebSocket = undefined