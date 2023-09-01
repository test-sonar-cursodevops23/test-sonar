const handler = require("../lambda");

describe("Testing of lambda getClient", () => {
    it("It should return an object with the client's data", async () => {
        
        const event = {
            countryId: "AR",
            cpgId: "001",
            organizationId: "3046",
            clientId: "0500000003",
        }

        const data = {
            httpStatus: 200,
            ok: true,
            code: 0,
            data: {
                clientId: '0500000003',
                clientStateId: null,
                reason: null,
                lastUpdateDate: null,
                deletionDate: null,
                companyName: 'BLANGINO TITO NERI',
                regionId: '03',
                region: 'Córdoba',
                routeId: 'A010',
                route: 'SUPERMERCADOS CBA',
                saleZoneId: '1019',
                saleZone: 'Montecristo',
                managerId: '1246',
                manager: null,
                teamLeaderId: 'C41',
                teamLeader: 'ABC222',
                canalId: '032',
                canal: 'SUPERMERCADOS',
                cpgId: '001',
                countryId: 'AR',
                organizationId: '3046'
            }             
        }

        const client = {               
                clientId: '0500000003',
                clientStateId: null,
                reason: null,
                lastUpdateDate: null,
                deletionDate: null,
                companyName: 'BLANGINO TITO NERI',
                regionId: '03',
                region: 'Córdoba',
                routeId: 'A010',
                route: 'SUPERMERCADOS CBA',
                saleZoneId: '1019',
                saleZone: 'Montecristo',
                managerId: '1246',
                manager: null,
                teamLeaderId: 'C41',
                teamLeader: 'ABC222',
                canalId: '032',
                canal: 'SUPERMERCADOS',
                cpgId: '001',
                countryId: 'AR',
                organizationId: '3046'
                
        }
        

        const managers = {
            client: {
                validateGetClientRequiredParams: jest.fn(),
                validateExistsClient: jest.fn()
            }
        }

        const repositories = jest.fn().mockResolvedValue({
            Client: {
                getClient: jest.fn().mockResolvedValue(client)
            },
            closeConnection: jest.fn()
        })

        const response = {
            success: jest.fn((client, status = 200, paginationObject = null) => ({
                httpStatus: status,
                ok: true,
                code: 0,
                data: client
            })),
            error: jest.fn()
        }

        const { getClient } = handler({repositories, managers, response});
        const resultGetClient = await getClient(event);

        expect(managers.client.validateGetClientRequiredParams.mock.calls).toEqual([[event]]);
        const { Client, closeConnection } = await repositories();
        expect(repositories.mock.calls).toEqual([[],[]])
        expect(Client.getClient.mock.calls).toEqual([[event]]);
        expect(managers.client.validateExistsClient.mock.calls).toEqual([[client]])
        expect(response.success.mock.calls).toEqual([[client, 200, null]]);
        expect(resultGetClient).toEqual(data)
        expect(closeConnection.mock.calls).toEqual([[]]);
    });


    it("It should return an error on validateGetClientRequiredParams", async () => {
        
        const event = {
            countryId: "AR",
            organizationId: "3046",
            clientId: "0500000003",
        }

        const data = {
            metadata: undefined,
            msg: 'cpg_id_required',
            code: 3,
            type: 'validation_error',
            httpStatus: 400,
        }

        const client = {               
                clientId: '0500000003',
                clientStateId: null,
                reason: null,
                lastUpdateDate: null,
                deletionDate: null,
                companyName: 'BLANGINO TITO NERI',
                regionId: '03',
                region: 'Córdoba',
                routeId: 'A010',
                route: 'SUPERMERCADOS CBA',
                saleZoneId: '1019',
                saleZone: 'Montecristo',
                managerId: '1246',
                manager: null,
                teamLeaderId: 'C41',
                teamLeader: 'ABC222',
                canalId: '032',
                canal: 'SUPERMERCADOS',
                cpgId: '001',
                countryId: 'AR',
                organizationId: '3046'
                
        }
        

        const managers = {
            client: {
                validateGetClientRequiredParams: jest.fn(() => {
                    throw Object.assign(new Error, {
                        customError: true,
                        getData: jest.fn().mockReturnValue({
                            httpStatus: 400,
                            status: 'error',
                            code: 3,
                            msg: 'cpg_id_required',
                            type: 'validation_error',
                        })
                    })
                }),
                validateExistsClient: jest.fn()
            }
        }

        const repositories = jest.fn().mockResolvedValue({
            Client: {
                getClient: jest.fn().mockResolvedValue(client)
            },
            closeConnection: jest.fn()
        })

        const response = {
            success: jest.fn(),
            error: jest.fn().mockReturnValue({
                metadata: undefined,
                msg: 'cpg_id_required',
                code: 3,
                type: 'validation_error',
                httpStatus: 400,
            })
        }

        const errorParameters = [
            undefined,
            'cpg_id_required',
            3,
            'validation_error',
            400
        ]

        const { getClient } = handler({repositories, managers, response});
        const resultGetClient = await getClient(event);

        const { closeConnection } = await repositories();

        expect(managers.client.validateGetClientRequiredParams.mock.calls).toEqual([[event]]);
        expect(response.error.mock.calls).toEqual([errorParameters]);
        expect(resultGetClient).toEqual(data)
        expect(closeConnection.mock.calls).toEqual([]);
    });


    it("It should return an error on validateExistsClient", async () => {
        
        const event = {
            countryId: "AR",
            cpgId: "001",
            organizationId: "3046",
            clientId: "0500000013",
        }

        const data = {
            httpStatus: 404,
            status: 'error',
            code: 17,
            msg: 'El cliente no se encuentra registrado en el sistema.',
            params: undefined,
            customError: true,
            type: 'promotion_error'
        }

        const client = {               
                clientId: '0500000003',
                clientStateId: null,
                reason: null,
                lastUpdateDate: null,
                deletionDate: null,
                companyName: 'BLANGINO TITO NERI',
                regionId: '03',
                region: 'Córdoba',
                routeId: 'A010',
                route: 'SUPERMERCADOS CBA',
                saleZoneId: '1019',
                saleZone: 'Montecristo',
                managerId: '1246',
                manager: null,
                teamLeaderId: 'C41',
                teamLeader: 'ABC222',
                canalId: '032',
                canal: 'SUPERMERCADOS',
                cpgId: '001',
                countryId: 'AR',
                organizationId: '3046'
                
        }
        

        const managers = {
            client: {
                validateGetClientRequiredParams: jest.fn(),
                validateExistsClient: jest.fn(() => {
                    throw Object.assign(new Error, {
                        customError: true,
                        getData: jest.fn().mockReturnValue({
                            httpStatus: 404,
                            status: 'error',
                            code: 17,
                            msg: 'El cliente no se encuentra registrado en el sistema.',
                            params: undefined,
                            customError: true,
                            type: 'promotion_error'
                        }
                    )})
                })
            }
        }

        const repositories = jest.fn().mockResolvedValue({
            Client: {
                getClient: jest.fn().mockResolvedValue(client)
            },
            closeConnection: jest.fn()
        })

        const response = {
            success: jest.fn(),
            error: jest.fn().mockReturnValue({
                httpStatus: 404,
                status: 'error',
                code: 17,
                msg: 'El cliente no se encuentra registrado en el sistema.',
                params: undefined,
                customError: true,
                type: 'promotion_error'
            })
        }

        const { getClient } = handler({repositories, managers, response});
        const resultGetClient = await getClient(event);

        expect(managers.client.validateGetClientRequiredParams.mock.calls).toEqual([[event]]);
        const { Client, closeConnection } = await repositories();
        expect(repositories.mock.calls).toEqual([[],[]])
        expect(Client.getClient.mock.calls).toEqual([[event]]);
        expect(managers.client.validateExistsClient.mock.calls).toEqual([[client]])
        expect(resultGetClient).toEqual(data)
        expect(closeConnection.mock.calls).toEqual([[]]);
    });
})