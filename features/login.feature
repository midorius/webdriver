Feature: The Internet Guinea Pig Website

  Scenario Outline: As a user, I can log into the secure area

    Given I am on the login page
    When I login with <username> and <password>
    Then I should see a flash message saying <message>

    Examples:
      | username | password             | message                        |
      | standard_user | secret_sauce | - |
      | locked_out_user   | secret_sauce               | Epic sadface: Sorry, this user has been locked out.      |

      |problem_user | secret_sauce | - |
      |performance_glitch_user | secret_sauce | - |
      |error_user | secret_sauce | - |
      |visual_user | secret_sauce | - |
      |  |secret_sauce | Epic sadface: Username is required |
      | standard_user |  | Epic sadface: Password is required |
      |fake_user | fake_password | Epic sadface: Username and password do not match any user in this service |

  Scenario: Order process
    Given I am on the login page
    When I login with standard_user and secret_sauce
    Then I should be on the inventory page
    When I add an item to cart
    When I go to cart
    When I checkout
    Then I should see "Thank you for your order!"

  Scenario: Login logout
    Given I am on the login page
    When I login with standard_user and secret_sauce
    Then I should be on the inventory page
    When I logout
    Then I should be on the login page