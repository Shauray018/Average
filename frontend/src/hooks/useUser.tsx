import { useState, useEffect } from "react";
import { decodeToken } from "react-jwt";
import axios from "axios";
import config from "../config";
// Define the interface for the decoded token
interface Dtoken { 
    id: string;
    // Add other properties that you expect to be in the token
}

// Custom hook to use user information from the JWT token
export function useUser() { 
    const [id, setId] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('Authorization');
            if (token) {
                try {
                    const myDecodedToken = decodeToken<Dtoken>(token);
                    console.log("Decoded Token:", myDecodedToken); // Debugging line

                    if (myDecodedToken) {
                        setId(myDecodedToken.id);

                        const configs = {
                            method: 'post',
                            url: `${config.backendUrl}/api/v1/user`,
                            headers: { 
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                            data: {
                                id: myDecodedToken.id
                            }
                        };

                        const response = await axios.request(configs);
                        console.log("API Response:", response.data); // Debugging line

                        const user = response.data.user;
                        setName(user.name);
                        setEmail(user.email);
                    }
                } catch (error) {
                    console.error("Failed to decode token or fetch user data:", error);
                    setError("Failed to fetch user data");
                }
            } else {
                setError("Token not found");
            }
        };

        fetchData();
    }, []);

    return { id, name, email, error };
}
