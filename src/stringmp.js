// Longest Substring Without Repeating Characters:

// Given a string s, find the length of the longest substring without repeating characters.
// Input: s = "abcabcbb"
// Output: 3 (The answer is "abc", with the length of 3).
function lengthOfLongestSubstring(s) {
    let n = s.length;
    let set = new Set();
    let ans = 0, i = 0, j = 0;
    // debug
    while (i < n && j < n) {
        if (!set.has(s[j])) {
            set.add(s[j++]);
            ans = Math.max(ans, j - i);
        } else {
            set.delete(s[i++]);
        }
    }
    return ans;
}
// Explanation:

// We use a sliding window approach with two pointers i (start) and j (end).
// A set is used to keep track of characters in the current window without duplicates.
// If s[j] is not in the set, we add it and move j to the right, updating the answer ans as the maximum length found.
// If s[j] is in the set, we remove s[i] from the set and move i to the right to shrink the window until no duplicates remain.

// console.log(lengthOfLongestSubstring("abcabcbb"));

// Longest Substring with At Most K Distinct Characters:

// Given a string, find the length of the longest substring that contains at most k distinct characters.
// Input: s = "eceba", k = 2
// Output: 3 (The answer is "ece", with the length of 3).
function lengthOfLongestSubstringKDistinct(s, k) {
    let n = s.length;
    if (n * k === 0) return 0;

    let left = 0, right = 0;
    let hashmap = new Map();
    let maxLength = 1;

    while (right < n) {
        hashmap.set(s[right], right++);

        if (hashmap.size === k + 1) {
            let del_idx = Math.min(...hashmap.values());
            hashmap.delete(s[del_idx]);
            left = del_idx + 1;
        }

        maxLength = Math.max(maxLength, right - left);
    }
    return maxLength;
}
// Explanation:

// We use a sliding window with two pointers left and right.
// A hashmap keeps track of characters and their most recent positions.
// If the size of the hashmap exceeds k, we find and remove the leftmost character to maintain at most k distinct characters.
// We update the maximum length of the substring whenever we extend the window.




// Minimum Window Subsequence:

// Given strings S and T, find the minimum window in S which will contain all the characters in T in the same order.
// Input: S = "abcdebdde", T = "bde"
// Output: "bcde"
function minWindow(S, T) {
    let minLen = Infinity;
    let start = 0, end = 0;
    for (let i = 0; i < S.length; i++) {
        if (S[i] === T[0]) {
            let j = 0;
            let k = i;
            while (k < S.length && j < T.length) {
                if (S[k] === T[j]) j++;
                k++;
            }
            if (j === T.length) {
                if (k - i < minLen) {
                    minLen = k - i;
                    start = i;
                    end = k;
                }
            }
        }
    }
    return minLen === Infinity ? "" : S.slice(start, end);
}
// Explanation:

// We iterate through the string S and start a new subsequence search whenever we find the first character of T.
// Using two pointers j (for T) and k (for S), we check if T is a subsequence of the substring of S starting at i.
// If we find a valid subsequence, we update the minimum length and starting and ending indices.


// Longest Repeating Character Replacement:

// Given a string that consists of only uppercase English letters, you can replace any letter with another letter at most k times. Find the length of the longest substring containing all repeating letters you can get after performing the above operations.
// Input: s = "AABABBA", k = 1
// Output: 4 (The answer is "AABA" after one replacement).
function characterReplacement(s, k) {
    let maxCount = 0, start = 0, maxLength = 0;
    let count = Array(26).fill(0);

    for (let end = 0; end < s.length; end++) {
        maxCount = Math.max(maxCount, ++count[s.charCodeAt(end) - 'A'.charCodeAt(0)]);

        if (end - start + 1 - maxCount > k) {
            count[s.charCodeAt(start) - 'A'.charCodeAt(0)]--;
            start++;
        }

        maxLength = Math.max(maxLength, end - start + 1);
    }

    return maxLength;
}
// Explanation:

// We use a sliding window with two pointers start and end.
// An array count keeps track of character frequencies in the current window.
// maxCount holds the count of the most frequent character in the window.
// If the window length minus maxCount exceeds k, we shrink the window by moving start.
// We update the maximum length of the window where replacement operations are valid.





// Longest Substring with Exactly K Distinct Characters:

// Given a string, find the length of the longest substring that contains exactly k distinct characters.
// Input: s = "aabbcc", k = 2
// Output: 4 (The answer is "aabb", with the length of 4).
function lengthOfLongestSubstringExactlyKDistinct(s, k) {
    const atMostK = (s, k) => {
        let count = new Map(), i = 0, result = 0;
        for (let j = 0; j < s.length; j++) {
            count.set(s[j], (count.get(s[j]) || 0) + 1);
            while (count.size > k) {
                count.set(s[i], count.get(s[i]) - 1);
                if (count.get(s[i]) === 0) count.delete(s[i]);
                i++;
            }
            result += j - i + 1;
        }
        return result;
    };
    return atMostK(s, k) - atMostK(s, k - 1);
}
// Explanation:

// This problem uses the sliding window technique to count substrings with at most k distinct characters (atMostK function).
// We subtract the result of at most k-1 distinct characters from the result of at most k distinct characters to get exactly k distinct characters.

// Subarray Sum Equals K:

// Given an array of integers and an integer k, find the total number of continuous subarrays whose sum equals to k.
// Input: nums = [1,1,1], k = 2
// Output: 2 (There are two subarrays [1,1] and [1,1]).
function subarraySum(nums, k) {
    let count = 0, sum = 0;
    let map = new Map();
    map.set(0, 1);
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        if (map.has(sum - k)) count += map.get(sum - k);
        map.set(sum, (map.get(sum) || 0) + 1);
    }
    return count;
}
// Explanation:

// We use a hashmap to store the cumulative sum and its frequency.
// We iterate through the array, maintaining a running sum.
// If the difference sum - k exists in the map, it means there is a subarray that sums up to k.
// We update the count of such subarrays and the map with the current sum.




// Find All Anagrams in a String:

// Given a string s and a non-empty string p, find all the start indices of p's anagrams in s.
// Input: s = "cbaebabacd", p = "abc"
// Output: [0, 6] (The answer is indices 0 and 6).
function findAnagrams(s, p) {
    let result = [];
    let pCount = new Array(26).fill(0);
    let sCount = new Array(26).fill(0);
    for (let i = 0; i < p.length; i++) {
        pCount[p.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }
    for (let i = 0; i < s.length; i++) {
        sCount[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
        if (i >= p.length) {
            sCount[s.charCodeAt(i - p.length) - 'a'.charCodeAt(0)]--;
        }
        if (pCount.join('') === sCount.join('')) {
            result.push(i - p.length + 1);
        }
    }
    return result;
}
// Explanation:

// We use two arrays pCount and sCount to store the frequency of characters in p and in the current window of s.
// We compare the frequency arrays to check for anagrams.
// If the window size exceeds p, we decrement the count of the character that is sliding out of the window.
// We add the start index of the window to the result if the frequency arrays match.





// Check Inclusions:

// Given two strings s1 and s2, write a function to return true if s2 contains the permutation of s1. In other words, one of the first string's permutations is the substring of the second string.
// Input: s1 = "ab", s2 = "eidbaooo"
// Output: True (s2 contains one permutation of s1 ("ba")).
function checkInclusion(s1, s2) {
    let map = new Array(26).fill(0);
    for (let i = 0; i < s1.length; i++) {
        map[s1.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }
    let start = 0, end = 0, count = s1.length;
    while (end < s2.length) {
        if (map[s2.charCodeAt(end++) - 'a'.charCodeAt(0)]-- > 0) count--;
        if (count === 0) return true;
        if (end - start === s1.length && map[s2.charCodeAt(start++) - 'a'.charCodeAt(0)]++ >= 0) count++;
    }
    return false;
}

// Explanation:

// We use an array map to store the frequency of characters in s1.
// We iterate through s2, decrementing the character count in the map.
// If a valid permutation is found (count becomes 0), we return true.
// We maintain the window size equal to s1.length and adjust the character counts when sliding the window.





// Longest Palindromic Substring:

// Given a string s, find the longest palindromic substring in s.
// Input: s = "babad"
// Output: "bab" or "aba"

function longestPalindrome(s) {
    let start = 0, end = 0;

    const expandAroundCenter = (s, left, right) => {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    };

    for (let i = 0; i < s.length; i++) {
        let len1 = expandAroundCenter(s, i, i);
        let len2 = expandAroundCenter(s, i, i + 1);
        let len = Math.max(len1, len2);
        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }
    return s.substring(start, end + 1);
}

// Explanation:

// We use the expandAroundCenter function to expand from the middle of a possible palindrome.
// For each character in the string, we consider it as the center and expand around it.
// We check for both odd-length (single character center) and even-length (two character center) palindromes.
// We update the start and end indices of the longest palindrome found.